import { Component } from '@angular/core';
import { MineService } from "../MineService";
import {NativeService} from "../../../providers/NativeService";
import {ViewController,NavParams} from 'ionic-angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-cash',
  templateUrl: 'cash.html',
  providers: [MineService]
})
export class CashPage {
  
  uinfo: any = {};
  amount: any = 10 ;
  account: string = '' ;
  captche: number ;
  paypassword: string = '' ;
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
    this.uinfo = this.navParams.get('info');
    
  };

  ionViewWillEnter(){
  
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  savecash(){
    if(this.amount<=0){
      return this.nativeService.showToast('请输入提现金额！');
    }
    if(!this.account){
      return this.nativeService.showToast('请输入支付宝账户！');
    }
    if(!this.paypassword){
      return this.nativeService.showToast('请输入支付密码！');
    }
    if(!this.captche){
      return this.nativeService.showToast('请输入验证码！');
    }
    let param = {
      amount:this.amount,
      account:this.account,
      paypassword:this.paypassword,
      captche:this.captche
    };
    this.mineService.applyCash(param).subscribe(res=>{
      if(res.code == 0 ){
          this.nativeService.showToast(res.message);
          this.viewCtrl.dismiss(param);
      }else{
          this.nativeService.showToast(res.message);
      }
    })
  }


  getCode(){
    if(this.uinfo.telphone && this.timer == false){
      this.codeHtml = "验证码发送中";

      this.mineService.sendcode('login/sendPublicCode/'+this.uinfo.telphone+'/check')
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
