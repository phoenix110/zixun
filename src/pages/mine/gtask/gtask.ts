import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";
import { GtaskinfoPage } from "../gtaskinfo/gtaskinfo";
import { GlobalData } from "../../../providers/GlobalData";
import { DemandinfoPage } from '../../demand/demandinfo/demandinfo';

@Component({
  selector: 'page-gtask',
  templateUrl: 'gtask.html',
  providers: [MineService]
})
export class GtaskPage {
  demand : any = [];
  type: number = 0;
  status: number = 0;
  //雇主报价中
  pricecount: number = 0;
  nopaycount: number = 0;
  nocheckcount: number = 0;
  overcount: number = 0;
  constructor(
  private globalData: GlobalData,
  private navController: NavController,
  private viewCtrl: ViewController,
  private mineService: MineService
  ) {
    
  };

  ionViewDidLoad(){
    this.type = this.globalData.type;
    if(this.type==1){
      this.getDemandUser();
    }else if(this.type==2){
      this.status = 4;
      this.getDemand();
    }
    this.getDemandCount();
  }

  back(){
    this.viewCtrl.dismiss();
  }

  getDemandCount(){
    this.mineService.getDemandCount({s:this.globalData.userId}).subscribe(res=>{
      if(res.code==0){
        this.nocheckcount = res.value.nocheckcount
        this.nopaycount = res.value.nopaycount
        this.overcount = res.value.overcount
        if(res.value.pricecount)
        {
          this.pricecount = res.value.pricecount
        }

      }

    })
  }

	info(info){
    if(this.type==2){
      
      this.navController.push(DemandinfoPage,{info:info})
    }else{
		  this.navController.push(GtaskinfoPage,{info:info})
    }
	}

  setStatus( num ){
    

    if(this.type==1){
        if(num==4){
          this.status = 4;
          num = 1;
        }else if(num==1){
          this.status = num;
          num = 2;
        }else if(num==2){
          this.status = num;
          num = 4;
        }else{
          this.status = num;
        }
        this.mineService.getDemandUser({s:this.type,status:num}).subscribe(res=>{
          if(res.code==0){
            this.demand = res.value;
          }

        })
    }else if(this.type==2){
      this.status = num;

        this.mineService.getDemand({status:num}).subscribe(res=>{
          if(res.code==0){
            this.demand = res.value;
          }

        })
    }

    
  }

  getDemand(){
    this.mineService.getDemand({s:this.type,status:4}).subscribe(res=>{
      if(res.code==0){
        this.demand = res.value;
      }

    })

  }

  getDemandUser(){
    this.mineService.getDemandUser({s:this.type,status:0}).subscribe(res=>{
      if(res.code==0){
        this.demand = res.value;
      }

    })

  }

}
