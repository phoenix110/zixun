import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { DemandService } from "../DemandService";
import { NativeService } from "../../../providers/NativeService";
import { Alipay } from '@ionic-native/alipay';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
  providers: [DemandService]
})
export class PayPage {
	
  info: any = {};
  number: any = '';
  balancePay: any = false;
  balance: any = 0;
  haspaypwd: any = false;
  payway: number = 3;
	paypwd: string = '';
  httpResponseData:any;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
        private alipay: Alipay,
  private viewCtrl: ViewController,
  public nativeService: NativeService,
  private demandService: DemandService) {

  }

  ionViewWillEnter(){

    let data = this.navParams.get("info");
    this.info = data;
    this.number = data.number;
    this.getUser();
    
  }

  getUser(){
      this.demandService.paypage(this.number).subscribe(res => {
        if(res.code==0){
          this.balance = res.value.balance
          this.haspaypwd = res.value.haspaypwd
        }else{
          this.nativeService.showToast(res.message)
        }
      });
  }

  ionViewDidLoad() {
    

  }

  setpaypwd(){

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  payType( way ){
    if(way==2 && this.info.bond > this.balance){
      this.nativeService.showToast('抱歉，您的账户余额不足，请选择其他支付渠道！')
    }else{
      this.payway = way;
    }
  }

  confirmPay(){
    if(this.payway==2){
      this.setPayType(2);
    }
    if(this.payway==3){ //alipay
      this.setPayType(3);
      this.pay();
    }
    if(this.payway==4){
      this.nativeService.showToast('抱歉，第三方支付暂未开通，请选择其他支付渠道！')
    }
  }

  goalipay() {
    let that = this;
    console.log(this.httpResponseData)
    this.alipay.pay(this.httpResponseData)
      .then(res => {
        
        if(res.resultStatus=='4000'){
          this.nativeService.showToast('订单支付失败');
        }
        if(res.resultStatus=='6001'){
          console.log(res.resultStatus);
        }
        if(res.resultStatus=='9000'){
          this.info.status = 2;
          console.log('成功');
          this.viewCtrl.dismiss();
        }
        
        console.log('res',res.resultStatus)
        console.log('memo',res.memo)

      }, err => {
        console.log('err')

      })
      .catch(e => {
          that.info.status = 2;
          this.viewCtrl.dismiss();
      });

  }

  confirmBalancePay(){
    if(this.paypwd==''){
      this.nativeService.showToast('请输入支付密码！')
      return 
    }else{
      this.pay();
    }
  }

  pay(){
    this.demandService.pay(this.number,this.payway,this.paypwd).subscribe(res => {
      if(res.code==0){
        if(this.payway==2){
          this.viewCtrl.dismiss({paystatus:true});
        }
        if( this.payway==3){
          this.httpResponseData = res.value;
          this.goalipay()
        }
        if( this.payway==4){

        }
      }else{
        this.nativeService.showToast(res.message)
      }
    });
  }

  setPayType( type ){
    if(type==1){
      this.balancePay = false
    }
    if(type==2){
      this.balancePay = true;
    }
  }

  

}
