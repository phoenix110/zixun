import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";
import { CaseinfoPage } from "../caseinfo/caseinfo";

@Component({
  selector: 'page-case',
  templateUrl: 'case.html',
  providers: [MineService]
})
export class CasePage {
  case: any = [];
  status: any = '';
  constructor(
  private navController: NavController,
  private viewCtrl: ViewController,
  private mineService: MineService
  ) {
    
  };

  dismiss(){
    this.viewCtrl.dismiss();
  }

	info(item){
		this.navController.push(CaseinfoPage,{info:item})
	}

  menu(s){
    this.status = s;
    this.getCase({status:s})
  }

  ionViewDidLoad(){
    this.getCase({a:1});
  }

  getCase(param){
    this.mineService.getCase(param).subscribe(res=>{
      if(res.code==0){
        this.case = res.value;
      }
    })
  }

}
