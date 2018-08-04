import { Injectable } from '@angular/core';
import { LoadingController} from 'ionic-angular';
import { NativeService } from "./NativeService";
declare let Wechat;

/**
 * 微信封装
 * @description
 */
@Injectable()
export class Wechats {

  constructor(
    private nativeService: NativeService,
    private loadingCtrl: LoadingController) {

  }

  weChatAuth() {
    let loading = this.loadingCtrl.create({
        content: "跳转微信登录中...",//loading框显示的内容
        dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
        showBackdrop: true  //是否显示遮罩层
      });
    loading.present();
    try {
      
      let scope = "snsapi_userinfo",
      state = "_" + (+new Date());
      console.log('state',state);
      Wechat.auth(scope, state, (response) => {
      console.log(scope);
      console.log(response);
        this.nativeService.showToast(JSON.stringify(response));
      }, (reason) => {
      console.log(reason);
        this.nativeService.showToast("Failed: " + reason);
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log(1);
      loading.dismiss();
    }
  }

  weChatPay( params:any ) {
    

    Wechat.sendPaymentRequest(params, function () { 
      console.log("Success");//支付成功回调 
    }, function (reason) { 
      console.log("Failed",reason);//支付回调 
    });
  }


  wxShare(scene,shareUrl,shareTitle,shareDesc,shareImg){
    Wechat.isInstalled((installed)=> {
      if(installed){
        Wechat.share({
          message: {
              title: shareImg,
              description: shareDesc,
              thumb: shareImg,
              media: {
                  //type: Wechat.Type.LINK,
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: shareUrl
              }
          },
            scene: scene == 0 ? Wechat.Scene.SESSION : Wechat.Scene.Timeline 
          }, function () {
             this.nativeService.showToast('分享成功');
          }, function (reason) {
              this.nativeService.showToast("分享失败: " + reason);
          });  
      }
      else 
        this.nativeService.showToast("没有安装微信 ");
    });
  }
}
