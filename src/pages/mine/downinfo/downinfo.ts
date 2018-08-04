import { Component } from '@angular/core';
import { MineService } from "../MineService";
import { NavParams,ViewController } from 'ionic-angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-downinfo',
  templateUrl: 'downinfo.html',
  providers: [MineService]
})
export class DowninfoPage {
  info: any = {};
  constructor(
        public storage: Storage,
        private viewCtrl: ViewController,
        public navParams: NavParams,
    private mineService: MineService
  ) {
  };

  ionViewWillEnter(){
    this.info = this.navParams.get('info');
    console.log(this.info)
    //this.getInfo();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  getInfo(){
    this.mineService.getDownDetail(this.info.id).subscribe(res => {
      this.info = res.value;

    });
  }



}
