import { Component } from '@angular/core';
import { ViewController,NavController } from 'ionic-angular';
import { HelpinfoPage } from "../helpinfo/helpinfo";
import { MineService } from "../MineService";

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
  providers: [MineService]
})
export class HelpPage {
	list:any = [];
  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private mineService: MineService
  ) {
    
  };

  ionViewDidLoad(){
  	this.getHelp();
  }

  getHelp(){
  	this.mineService.getHelp().subscribe(res=>{
  		if(res.code==0){
  			this.list = res.value;
  		}
  	});
  }

  back(){
  	this.viewCtrl.dismiss();
  }

  info( item ){
  	this.navCtrl.push(HelpinfoPage,{item:item})
  }


}