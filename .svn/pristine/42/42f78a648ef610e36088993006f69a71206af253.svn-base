import { Component } from '@angular/core';
import { ViewController , NavParams } from 'ionic-angular';

@Component({
  selector: 'page-helpinfo',
  templateUrl: 'helpinfo.html'
})
export class HelpinfoPage {
	item:any = {};
  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) {
    this.item = this.navParams.get('item');
  }
  back(){
  	this.viewCtrl.dismiss();
  }
}
