import { Component } from '@angular/core';
import { MessageService } from "../MessageService";
import { NavParams,ViewController } from 'ionic-angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-msginfo',
  templateUrl: 'msginfo.html',
  providers: [MessageService]
})
export class MsginfoPage {
  id: any = 0;
  info: any = {};
  constructor(
        public storage: Storage,
        private viewCtrl: ViewController,
        public navParams: NavParams,
    private messageService: MessageService
  ) {
  };

  ionViewWillEnter(){
    this.id = this.navParams.get('id');
    this.getInfo();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  getInfo(){
    this.messageService.getDetail(this.id).subscribe(res => {
      this.info = res.value;

    });
  }



}
