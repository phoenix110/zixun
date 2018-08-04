import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, Keyboard, AlertController,ToastController,Events } from 'ionic-angular';
import { NativeService } from "../providers/NativeService";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { MessagePage } from '../pages/message/message';
import { Helper } from "../providers/Helper";
import { Storage } from '@ionic/storage';
import { GlobalData } from "../providers/GlobalData";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
   @ViewChild('myNav') nav: Nav;

  constructor(
  public ionicApp: IonicApp,
  public keyboard: Keyboard,
  public platform: Platform,
  private events: Events,
  private helper: Helper,
  private globalData: GlobalData,
  private storage: Storage,
  public alertCtrl: AlertController,
  statusBar: StatusBar,
  private toastCtrl: ToastController,
  splashScreen: SplashScreen,
  private nativeService: NativeService) {
  platform.ready().then(() => {
      this.helper.initJpush(); //初始化极光推送
      this.storage.get('UserInfo').then(UserInfo => {

        if(UserInfo && UserInfo.id){
          this.events.publish('user:login',UserInfo);
          this.globalData.loginTime = UserInfo.logintime;
          this.globalData.userId = UserInfo.id;
          this.globalData.idcode = UserInfo.idcode;
          this.globalData.username = UserInfo.username;
          this.globalData.nickname = UserInfo.nickname;
          this.globalData.fullName = UserInfo.username;
          this.globalData.notice = UserInfo.notice;
          this.globalData.type = UserInfo.type;
          this.globalData.sex = UserInfo.sex;
          this.globalData.validate = UserInfo.validate;
          this.globalData.avatar = UserInfo.avatar;
          this.globalData.email = UserInfo.email;
          this.globalData.telphone = UserInfo.telphone;
          this.helper.setTags();
          this.helper.setAlias(UserInfo.id);
        }

    });

      this.events.subscribe('click', (res) => {
        this.nav.goToRoot({}).then(() => {//页面返回到根页面,就是app一进来的页面
          this.nav.push(MessagePage);//跳转到指定页面
          
        });
      });


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
       this.registerBackButtonAction();//注册返回按键事件
       this.assertNetwork();//检测网络

       this.helper.assertUpgrade().subscribe(res => {//检测app是否升级
          res.update && this.nativeService.downloadApp();
        });
        
    });
  }

  assertNetwork() {
    if (!this.nativeService.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
  }

  registerBackButtonAction() {
     this.platform.registerBackButtonAction(() => {
      if( this.keyboard.isOpen()){ //如果键盘开启则隐藏键盘
        this.keyboard.close();
        return ;
      }

       //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
       // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
       let activePortal = this.ionicApp._modalPortal.getActive();
       if (activePortal) {
         activePortal.dismiss().catch(() => {});
         activePortal.onDidDismiss(() => {});
         return;
       }
       let activeVC = this.nav.getActive();
       let tabs = activeVC.instance.tabs;
       let activeNav = tabs.getSelected();
        return activeNav.canGoBack() ? activeNav.pop() : this.nativeService.minimize();//this.showExit()
     }, 1);
   }

   //双击退出提示框
   showExit() {
   let thisplatform = this.platform;

   if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.alertCtrl.create({
        title:'提示',
         message: '确定退出有空吗?',
          buttons: [
        {
          text: '取消',
          handler: () => {
            
          }
        },
        {
          text: '退出',
          handler: () => {
            thisplatform.exitApp();

          }
        }
      ]
       }).present();
    } else {
      this.backButtonPressed = true;
      setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
        this.backButtonPressed = false;
      }, 2000)
    }


       
   }



}
