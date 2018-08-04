import { Component } from '@angular/core';
import { ModalController,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";
import { NativeService } from "../../../providers/NativeService";
import { Storage } from '@ionic/storage';
import { CashPage } from "../cash/cash";
import { RechargePage } from "../recharge/recharge";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
  providers: [MineService]
})
export class WalletPage {
  info:any = {};
  list:any = [];
  type:number = 1;
  nowpage:number = 1;
  loading:number = 1;
  constructor(
  private storage: Storage,
  public modalCtrl: ModalController,
  private viewCtrl: ViewController,
  private nativeService: NativeService,
  private mineService: MineService
  ) {
    
  };

  ionViewWillEnter() {
    this.storage.get('UserInfo').then(res=>{
      this.info = res;
    });
    this.getRecord(1);
  }

  getUserInfo(){
    this.mineService.getUserinfo().subscribe(result => {
          
          if(result.code==500){
            this.nativeService.showToast('登录信息已过期，请重新登录！');
            return ;
          }

          if(result.code==0){
            let value = result.value;
            this.info = value;
          }
      })

  }
  setType( type ){
    this.type = type;
    this.nowpage = 1;
    this.loading = 2;
    this.getRecord(type)
  }

   back(){
    this.viewCtrl.dismiss();
  }

  getRecord(type){
    this.type = type;
    this.mineService.getRecord(type).subscribe(res=>{
      this.list = res.value;
    });
  }

  goRecharge(){
    let profileModal = this.modalCtrl.create(RechargePage, {info:this.info});
     profileModal.onDidDismiss(data => {
       
     });
     profileModal.present();
  }

  goCash(){
    let profileModal = this.modalCtrl.create(CashPage, {info:this.info});
     profileModal.onDidDismiss(data => {
     });
     profileModal.present();
  }

  // 下拉加载更多
  doInfinite(infiniteScroll) {
    if(this.loading==1){

      let page = this.nowpage + 1 ;
      setTimeout(() => {
        let params = this.type + "/" + "&page=" + page;
        this.mineService.getRecord(params).subscribe(res => {
          if(res.code==0 && res.value.length>0){
            for (var i = 0; i < res.value.length; i++) {
               this.list.push( res.value[i] );
             }
             this.nowpage = page;
          }else{
            this.loading = 2;
            this.nativeService.showToast('已无更多数据');
          }
        });
        infiniteScroll.complete();
      }, 500);
    }else{
        infiniteScroll.complete();
      
    }

  }

}
