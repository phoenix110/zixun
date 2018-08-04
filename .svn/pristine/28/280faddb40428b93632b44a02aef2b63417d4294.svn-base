import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";
import { GlobalData } from "../../../providers/GlobalData";
import { DemandinfoPage } from '../../demand/demandinfo/demandinfo';

@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html',
  providers: [MineService]
})
export class CollectPage {
  demand : any = [];
 
  constructor(
  private globalData: GlobalData,
  private navController: NavController,
  private viewCtrl: ViewController,
  private mineService: MineService
  ) {
    
  };

  ionViewDidLoad(){
    
    this.getDemandCollect();
  }

  back(){
    this.viewCtrl.dismiss();
  }

  getDemandCollect(){
    this.mineService.getDemandCollect({s:this.globalData.userId}).subscribe(res=>{
      if(res.code==0){
        this.demand = res.value
      }
    })
  }

	info(info){
    this.navController.push(DemandinfoPage,{info:info})
	}

  delCollect( demandid , index ){

    this.mineService.delCollect(demandid).subscribe(res=>{
        if(res.code==0){
          this.demand.splice(index,1);
        }

      })

    
  }


}
