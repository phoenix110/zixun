import { Component } from '@angular/core';
import { MineService } from "../MineService";
import {NativeService} from "../../../providers/NativeService";
import {ViewController,NavParams} from 'ionic-angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-bindemail',
  templateUrl: 'bindemail.html',
  providers: [MineService]
})
export class BindemailPage {
  
  uinfo: any = {};
  email: string = '';
  captche: number;
   // 定时器
  private timer: any = false ;
  private num:number = 60;
  codeHtml: any = '获取验证码';
  constructor(
        public storage: Storage,
        private nativeService: NativeService,
        private viewCtrl: ViewController,
  public navParams: NavParams,
    private mineService: MineService
  ) {
    this.uinfo = this.navParams.get('uinfo');
    
  };

  ionViewWillEnter(){
  }

  dismiss(){

      this.viewCtrl.dismiss();
  }

  savebind(){
    if(!this.captche || !this.email){
      this.nativeService.showToast('请输入完整的信息！')
      return
    }
    let data = {
      phone:this.email,
      yzm:this.captche,
      type:'youxiang',
      b:2
    }
    this.mineService.bindEmail(data).subscribe(res=>{
        if(res.code==0){
          this.viewCtrl.dismiss(this.email);
        }else{
          this.nativeService.showToast(res.message)

        }
    })

  }

  getCode(){
    if(this.email && this.timer == false){
      this.codeHtml = "验证码发送中";

      this.mineService.sendcode('login/sendPublicCode/'+this.email+'/bind')
      .subscribe(res => {
        if(res.code == 0 ){
          this.counttitme();
        }else{
          this.codeHtml = "获取验证码";
          this.nativeService.showToast(res.message);
          return false;
        }
      
      });
    }else{
      console.log('倒计时中~')
    }
  }


   // 每一秒更新时间差
  counttitme() {
    this.timer = setInterval(() => {
      this.codeHtml = this.num + " s 后重发";
      this.num = this.num - 1 ;
      if(this.num==0){
        this.ngOnDestroyTimer();
      }
    }, 1000);
  }

  // 销毁组件时清除定时器
  ngOnDestroyTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.num = 60;
      this.timer = false;
      this.codeHtml = "获取验证码";
    }
  }

}
