import {Injectable} from '@angular/core';
import { Events } from 'ionic-angular';
import { Response} from "@angular/http";
import {NativeService} from "./NativeService";
import {HttpService} from "./HttpService";
import { Observable } from "rxjs/Observable";
import {APP_VERSION_SERVE_URL} from "./Constants";
import {Utils} from "./Utils";
import {Logger} from "./Logger";
import {AlertController} from "ionic-angular";
import 'rxjs/add/operator/map';

declare var window;
/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
@Injectable()

export class Helper {

  
  constructor( 
    private events: Events,
    private httpService: HttpService,
    public logger: Logger,
    private alertCtrl: AlertController,
    private nativeService: NativeService
    ) {
  }

    /**
   * app是否需要更新
   * @returns {any}
   */
  assertUpgrade(): Observable<any> {
    if (!this.nativeService.isMobile()) {
      return Observable.of({update: false, msg: '请使用真机调试'});
    }
    return Observable.create(observer => {
      this.nativeService.getPackageName().subscribe(packageName => {//获得app包名
        let appName = packageName.substring(packageName.lastIndexOf('.') + 1);
        let appType = this.nativeService.isAndroid() ? 'android' : 'ios';
        let url = Utils.formatUrl(`${APP_VERSION_SERVE_URL}/index/app/${appName}/${appType}/latest/version`);

        this.httpService.get(url).map((res: Response) => res.json()).subscribe(res => {
            if (res.code!=0) {
              observer.next({update: false, msg: '暂无更新信息'});
              return;
            }
          

          this.nativeService.getVersionNumber().subscribe(currentNo => {//获得当前app版本
            //console.log('当前版本号',currentNo)
            //console.log('获取版本号',res.version)
            if (currentNo == res.version) {//比较版本号
              observer.next({update: false, msg: '已经是最新版本'});
            } else {
              if (res.isForcedUpdate == 1) {//判断是否强制更新
                this.alertCtrl.create({
                  title: '重要升级',
                  subTitle: '您必须升级后才能使用！',
                  enableBackdropDismiss: false,
                  buttons: [{
                    text: '确定', handler: () => {
                      observer.next({update: true, msg: ''});
                    }
                  }
                  ]
                }).present();
              } else {
                this.alertCtrl.create({
                  title: '升级',
                  subTitle: '发现新版本,更新安装后将自动退出，是否立即升级？',
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: '取消', handler: () => {
                      observer.next({update: false, msg: ''});
                    }
                    },
                    {
                      text: '确定', handler: () => {
                      observer.next({update: true, msg: ''});
                    }
                    }
                  ]
                }).present();
              }
            }
          })


        },err=>{
            this.logger.log(err, '从版本升级服务获取版本信息失败', {
              url: url
            })
        });
        
      })
    });


  }

  initJpush() {
    if (!this.nativeService.isMobile()) {
      return;
    }

    window.JPush.init();

    window.JPush.getRegistrationID(function(rId) {
      console.log("JPushPlugin:registrationID is " + rId)
    })

    if (this.nativeService.isIos()) {
      window.JPush.setDebugModeFromIos();
      window.JPush.setApplicationIconBadgeNumber(0);
    } else {
      window.JPush.setDebugMode(true);
    }
    this.jPushAddEventListener();
  }

  private jPushAddEventListener() {
    
    //判断系统设置中是否允许当前应用推送
    window.JPush.getUserNotificationSettings(result => {
      if (result == 0) {
        console.log('系统设置中已关闭应用推送');
      } else if (result > 0) {
        console.log('系统设置中打开了应用推送');
      }
    });

    //点击通知进入应用程序时会触发的事件
    document.addEventListener("jpush.openNotification", event => {
      let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
      console.log("jpush.openNotification" + content);

       this.events.publish('click',{});
      
      

    }, false);

    //收到通知时会触发该事件
    document.addEventListener("jpush.receiveNotification", event => {
      let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
      console.log("jpush.receiveNotification" + content);
    }, false);

    //收到自定义消息时触发这个事件
    document.addEventListener("jpush.receiveMessage", event => {
      let message = this.nativeService.isIos() ? event['content'] : event['message'];
      console.log("jpush.receiveMessage" + message);
    }, false);


    //设置标签/别名回调函数
    document.addEventListener("jpush.setTagsWithAlias", event => {
      console.log("onTagsWithAlias");
      let result = "result code:" + event['resultCode'] + " ";
      result += "tags:" + event['tags'] + " ";
      result += "alias:" + event['alias'] + " ";
      console.log(result);
    }, false);

  }

  //设置标签
  public setTags() {
    if (!this.nativeService.isMobile()) {
      return;
    }
    let tags = this.nativeService.isAndroid() ? ['android'] : ['ios'];
    console.log('设置setTags:' + tags);
    window.JPush.setTags(tags);
  }

  //设置别名,一个用户只有一个别名
  public setAlias(userId) {
    if (!this.nativeService.isMobile()) {
      return;
    }
    //ios设置setAlias有bug,值必须为string类型,不能是number类型
    window.JPush.setAlias({ sequence: 1, alias: '' + userId },(result) => {
      console.log('设置setAlias:' + result.alias);
    }, (error) => {
      console.log('设置setAlias失败');
    } );
  }

}