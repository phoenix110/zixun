import { Component,ViewChild } from '@angular/core';
import { NavParams,Slides,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";

@Component({
  selector: 'page-caseinfo',
  templateUrl: 'caseinfo.html',
  providers: [MineService]
})
export class CaseinfoPage {
  @ViewChild(Slides) slides: Slides;

	info : any = {};
	recommend : any = [];
  	constructor(
    	private navParams: NavParams,
        private viewCtrl: ViewController,
	  	private mineService: MineService) {
    
	};

	ionViewWillEnter(){
    this.info = this.navParams.get("info");
    this.getInfo();
    this.getRecommend();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  

   getInfo(){

	    this.mineService.getCaseinfo(this.info.number).subscribe(res => {
	      this.info = res.value;
	    });
  	}

  getRecommend(){
  		this.mineService.getRecommend({recommend:1,pagesize:4}).subscribe(res => {
	      this.recommend = res.value;
	    });
  }

}
