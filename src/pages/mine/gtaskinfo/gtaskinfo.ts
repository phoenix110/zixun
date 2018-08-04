import { Component } from '@angular/core';
import { NavParams,ViewController,AlertController } from 'ionic-angular';
import { MineService } from "../MineService";
import { NativeService } from "../../../providers/NativeService";

@Component({
  selector: 'page-gtaskinfo',
  templateUrl: 'gtaskinfo.html',
  providers: [MineService]

})
export class GtaskinfoPage {
  info:any = {};
  constructor(
    private navParams: NavParams,
    private nativeService: NativeService,
    private mineService: MineService,
    public alertCtrl: AlertController,
	  private viewCtrl: ViewController
	  ) {
	  
  };

  ionViewWillEnter(){
    this.info = this.navParams.get("info");
    this.getInfo();
  }

  back(){
    this.viewCtrl.dismiss();

  }

  getInfo(){

    this.mineService.getDemandUserDetail(this.info.number).subscribe(res => {
      this.info = res.value;
    });
  }

  pay(){
    this.nativeService.showToast('支付渠道未开通~')
  }
  cancel(){
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '确定要取消任务?',
        buttons: [
          {
            text: '算了',
            handler: () => {
              
            }
          },
          {
            text: '确定',
            handler: () => {
              this.saveCancel()
            }
          }
        ]
      });
      confirm.present();
  }

  saveCancel(){
    this.mineService.cancelUserDemand(this.info.number).subscribe(res => {
      this.info = res.value;
    });
  }
  
  down( num ){
    this.nativeService.showToast('暂时无法下载！')
  }


}
