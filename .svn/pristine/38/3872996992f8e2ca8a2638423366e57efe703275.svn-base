import { Component } from '@angular/core';
import { MineService } from "../MineService";
import { NavParams,NavController,ViewController } from 'ionic-angular';
import { CaseinfoPage } from "../caseinfo/caseinfo";
import { DemandinfoPage } from "../../demand/demandinfo/demandinfo";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
  providers: [MineService]
})
export class UserPage {
  menu: number = 1;
  uinfo: any = {};
  case: any = [];
  offer: any = [];
  demand: any = [];
  casecount: number = 0;
  offercount: number = 0;
  overcount: number = 0;
  constructor(
        private navCtrl: NavController,
    public navParams: NavParams,
  private viewCtrl: ViewController,
    private mineService: MineService
  ) {
    this.uinfo = this.navParams.get('uinfo');
    
  };

  ionViewWillEnter(){

  }

  back(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad(){
    this.getCase({s:this.uinfo.id});
    this.getColumnCount();
  }

  caseinfo(info){
    this.navCtrl.push(CaseinfoPage,{info:info})
  } 

  demandinfo(info){
    this.navCtrl.push(DemandinfoPage,{info:info})
  } 

  setmenu(num){
    this.menu = num;

    if(num==2 && this.offer.length==0){
      this.getOffer({s:this.uinfo.id});
    }

    if(num==3 && this.demand.length==0){
      this.getDemand();
    }

  }

  getCase(param){
    this.mineService.getCase(param).subscribe(res=>{
      if(res.code==0){
        this.case = res.value;
      }
    })
  }

  getOffer(param){
    this.mineService.getOffer(param).subscribe(res=>{
      if(res.code==0){
        this.offer = res.value;
      }
    })
  
  }

  getDemand(){
    this.mineService.getDemand({s:this.uinfo.id,status:5}).subscribe(res=>{
      if(res.code==0){
        this.demand = res.value;
      }

    })
  }

  getColumnCount(){
    this.mineService.getColumnCount({s:this.uinfo.id}).subscribe(res=>{
        console.log(res)
      if(res.code==0){
        this.casecount = res.value.casecount
        this.offercount = res.value.offercount
        this.overcount = res.value.overcount
      }

    })
  }
 
}
