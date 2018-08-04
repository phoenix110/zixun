import { Component } from '@angular/core';
import { MineService } from "../MineService";
import { NativeService } from "../../../providers/NativeService";
import { ViewController,NavParams} from 'ionic-angular';
import { Storage} from '@ionic/storage';
import { Alipay } from '@ionic-native/alipay';
import { Wechats } from "../../../providers/Wechats";

@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
  providers: [MineService]
})
export class RechargePage {
  
  uinfo: any = {};
  amount: number = 10;
  payway: number = 1;
  httpResponseData:any;
  payResult: any;
  constructor(
        public storage: Storage,
        private nativeService: NativeService,
        private viewCtrl: ViewController,
        private alipay: Alipay,
    public navParams: NavParams,
    public wechats: Wechats,
    private mineService: MineService
  ) {
    this.uinfo = this.navParams.get('info');
    
  };

  ionViewWillEnter(){
  }

  setPayway( way ){
    this.payway = way;
  }
  dismiss(){
      this.viewCtrl.dismiss();
  }
  save(){
    let params = "fee="+this.amount+"&payway="+this.payway;
    
    if(params){     

      this.mineService.recharge(params).subscribe(res=>{
      console.log(res)
        if(res.code == 0){
            this.httpResponseData = res.value;
            if(this.payway == 1){

              this.goalipay()
            }
            if(this.payway==2){
              this.wxpay()
            }
        }else{
          this.nativeService.showToast(res.value.return_msg);
        }
      });
    }else{
      this.viewCtrl.dismiss();
    } 
  }

  

  wxpay(){
    console.log(this.httpResponseData)
    if(this.httpResponseData.return_code ){
          this.nativeService.showToast(this.httpResponseData.return_msg);
    }else{

      this.wechats.weChatPay(this.httpResponseData)
    }
    
  }

  goalipay() {
    let that = this;
    this.alipay.pay(this.httpResponseData)
      .then(res => {
        
        if(res.resultStatus=='4000'){
          this.nativeService.showToast('订单支付失败');
        }
        if(res.resultStatus=='6001'){
          console.log(res.resultStatus);
        }
        if(res.resultStatus=='9000'){
          this.uinfo.balance = this.uinfo.balance + this.amount;
          this.storage.set('UserInfo',this.uinfo);
          this.viewCtrl.dismiss();
          
          console.log('充值成功');
        }
        
        console.log('res',res.resultStatus)
        console.log('memo',res.memo)

          this.payResult = res;
      }, err => {
        console.log('err',err)

          this.payResult = err;
      })
      .catch(e => {
          that.uinfo.balance = that.uinfo.balance + that.amount;
          that.storage.set('UserInfo',that.uinfo);
          this.viewCtrl.dismiss();
      });

  }


}
