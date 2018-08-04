import { Wechats } from './../../providers/Wechats';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser";
import { BrowserPopoverPage } from "./browser-popover";
import { NativeService } from "../../providers/NativeService";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { QQSDK,QQShareOptions } from '@ionic-native/qqsdk'; 


@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html'
})
export class BrowserPage {
  
  browser: any = {
    isLoaded: false, // 网页是否被加载
    proObj: null, // 进度条对象
    progress: 0, // 网页访问的进度条
    secUrl: '', // 安全链接

    title: '加载中',
    url: '',
    share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
  };

  shareConfig: any = {
    isShow: false
  }; // 分享控制的配置

  constructor(public navCtrl: NavController,
              private params: NavParams,
              private sanitizer: DomSanitizer,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private clipboard: Clipboard,
              private qq: QQSDK,
              private wechat: Wechats,
              private nativeService: NativeService
            ) {
    let browser = this.params.get('browser');
    if(browser) { 
      this.browser.title = browser.title;
      this.browser.url = browser.url;
      this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(browser.url);

      if(browser.share) {
        this.browser.share = browser.share;
      }

    } else {
      this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.browser.url);
    }
    this.reload();
  }

  ionViewDidLoad() {
    if(!this.browser.proObj) {
      this.browser.proObj = document.getElementById('progress');
    }
    this.onprogress();
  }

  // 生成随机数
  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // 网页访问进度
  private onprogress() {
    // 随机时间
    let timeout = this.random(10, 30);

    let timer = setTimeout(() => {
      if(this.browser.isLoaded) {
        this.browser.proObj.style.width = '100%';
        clearTimeout(timer);
        return;
      }

      // 随机进度
      this.browser.progress += this.random(1, 5);

      // 随机进度不能超过 90%，以免页面还没加载完毕，进度已经 100% 了
      if(this.browser.progress > 90){
        this.browser.progress = 90;
      }

      this.browser.proObj.style.width = this.browser.progress + '%';
      this.onprogress();
    }, timeout);
  }

  // 如果iframe页面加载成功后
  loaded() {
    this.browser.isLoaded = true;
  }

  // 显示Popver选项
  presentPopover(myEvent) {
   // console.log(myEvent);
   // this.shareQQ("www.163.com","test","test","shareImg");
   //   let popover = this.popoverCtrl.create(BrowserPopoverPage);
    //  popover.present();
    const clientOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ,
    };

    const options: QQShareOptions = {
      client: this.qq.ClientType.QQ,
      scene: this.qq.Scene.QQ,
      title: this.browser.share.title,
      url: this.browser.share.url,
      image: this.browser.share.thumb,
      description: this.browser.share.descr,
      //flashUrl:  'http://stream20.qqmusic.qq.com/30577158.mp3',
    };

    const options_zone: QQShareOptions = {
      client: this.qq.ClientType.QQ,
      scene: this.qq.Scene.QQZone,
      title: this.browser.share.title,
      url: this.browser.share.url,
      image: this.browser.share.thumb,
      description: this.browser.share.descr,
      //flashUrl:  'http://stream20.qqmusic.qq.com/30577158.mp3',
    };

    let actionSheet = this.actionSheetCtrl.create({
      title: '分享本页面',
      buttons: [
        {          
          text: 'QQ分享',          
          handler: () => {
            //console.log('Destructive clicked');
            console.log(JSON.stringify(this.browser.share));
            this.shareQQ(clientOptions,options);
          },
        },        {          
          text: 'QQ空间分享',          
          handler: () => {
            //console.log('Destructive clicked');
            console.log(JSON.stringify(this.browser.share));
            this.shareQQ(clientOptions,options_zone);
          },
         }, {
          text: '微信分享',          
          handler: () => {
            //console.log('Destructive clicked');
            this.wechat.wxShare(0,
              this.browser.share.url,
              this.browser.share.title,
              this.browser.share.descr,
              this.browser.share.thumb
            )
          },
        },{
          text: '微信朋友圈',          
          handler: () => {
            this.wechat.wxShare(1,
              this.browser.share.url,
              this.browser.share.title,
              this.browser.share.descr,
              this.browser.share.thumb
            );
          },
        }/*,{
          text: '新浪微博',
          handler: () => {
            console.log('Archive clicked');
          }
        }*/,{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
      });
      actionSheet.present();
/*
    let cb = {
      refresh: () => {
        this.reload();
      },
      close: () => {
        this.navCtrl.pop();
      },
      share: null
    };

    if(this.browser.share) {
      cb.share = () => {
        this.share();
      }
    }

    let popover = this.popoverCtrl.create(BrowserPopoverPage, {
      callback: cb
    });
    popover.present({
      ev: myEvent
    });
*/
  }

  // 重新加载页面
  reload() {
    let title = this.browser.title;
    let url = this.browser.secUrl;
    this.browser.title = '加载中';
    this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

    setTimeout(() => {
      this.browser.isLoaded = false;
      this.browser.progress = 0;
      if(!this.browser.proObj) {
        this.browser.proObj = document.getElementById('progress');
      }
      this.onprogress();
      this.browser.title = title;
      this.browser.secUrl = url;
    }, 10);
  }

//sharesdk: https://github.com/behring/cordova-sharesdk-demo
//https://www.npmjs.com/package/cordova-plugin-sharesdk


// ionic cordova plugin add cordova-plugin-x-socialsharing
// npm install --save @ionic-native/social-sharing

// 分享页面（作为popover的回调）
  share() {
    this.shareConfig.isShow = true;
    /*if(this.browser.share) {
      SocialSharing.share(this.browser.share.title, this.browser.share.content, '', this.browser.share.url).then(() => {

      }, (err) => {
        // Error!
        alert('错误：分享失败！' + err);
      });
    }*/
    //以下有很多函数可用，这个是通用的，https://ionicframework.com/docs/native/social-sharing/
    this.socialSharing.canShareViaEmail().then(() => {
    // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });

    // Share via email
    this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
   

  }

  //
  shareQQ(clientOptions,options){    
    this.qq.checkClientInstalled(clientOptions)
   .then(() => {
      this.qq.shareNews(options)
      .then(() => {
        this.nativeService.showToast('成功分享信息');
      })
      .catch(error => {
        this.nativeService.showToast('分享失败'+error);
      });
   })
   .catch(() => {
    this.nativeService.showToast('未安装QQ');
   });
       
  }


  
//分享朋友圈
  shareWxSession(shareUrl,shareTitle,shareDesc,shareImg){
    //let wechat = (<any>window).Wechat;
   
    
  }
//分享微信好友：
shareWxTimeLine(shareUrl,shareTitle,shareDesc,shareImg){
  let wechat = (<any>window).Wechat;
  wechat.isInstalled(function (installed) {
    if(!installed){
      this.nativeService.showToast('您没有安装微信！');
      return;
    }
  }, function (reason) {
      this.nativeService.showToast("分享失败: " + reason);
  });
  wechat.share({
  message: {
      title: shareImg,
      description: shareDesc,
      thumb: shareImg,
      media: {
          type: wechat.Type.LINK,
          webpageUrl: shareUrl
      }
  },
      scene: wechat.Scene.TIMELINE   // share to Timeline
  }, function () {
     this.nativeService.showToast('分享成功','bottom',4000);
  }, function (reason) {
      this.nativeService.showToast("分享失败: " + reason);
  });

}
//分享QQ空间：
shareQZone(shareUrl,shareTitle,shareDesc,shareImg){
  let qq = (<any>window).QQSDK;
  //let that = this;
  qq.checkClientInstalled(function () {
        var args:any = {};
        args.scene = qq.Scene.QQZone;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
        args.url = shareUrl;
        args.title = shareTitle;
        args.description = shareDesc;
        args.image = shareImg;
        qq.shareNews(function () {
            this.nativeService.showToast('分享成功','bottom',4000);
        }, function (failReason) {
            // alert(failReason);
        },args);
    }, function () {
    // if installed QQ Client version is not supported sso,also will get this error
        this.nativeService.showToast('分享失败，您没有安装QQ！');
    });
  }

  //复制到剪贴板
  copyClipboard(shareUrl) {
    this.clipboard.copy(shareUrl);
    this.nativeService.showToast('已复制到剪贴板');

    /*
    this.clipboard.paste().then(
    (resolve: string) => {
        alert(resolve);
      },
      (reject: string) => {
        alert('Error: ' + reject);
      }
    );
    this.clipboard.clear();
    */
  }

  //微博分享
  shareWb(shareUrl,shareTitle,shareDesc,shareImg){
    let wb = (<any>window).YCWeibo;
    //let that = this;
    wb.checkClientInstalled(function(){
      var args:any = {};
      args.url = shareUrl;
      args.title = shareTitle;
      args.description = shareDesc;;
      args.imageUrl = shareImg;//if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
      args.defaultText = "";
      wb.shareToWeibo(function () {
          this.nativeService.showToast('分享成功','bottom',4000);
      }, function (failReason) {
          // console.log(failReason);
      }, args);
      }
      ,function(){
          this.nativeService.showToast('分享失败：您没有安装Weibo！');
    });
  }
}