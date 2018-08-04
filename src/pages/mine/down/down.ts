import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";
import { DowninfoPage } from "../downinfo/downinfo";

@Component({
  selector: 'page-down',
  templateUrl: 'down.html',
  providers: [MineService]
})
export class DownPage {
  catemenu:number = 0;
  cate:any = [];
  list:any = [];
  constructor(
  private navController: NavController,
  private viewCtrl: ViewController,
  private mineService: MineService
  ) {
    
  };

  ionViewDidLoad(){
    this.getDataCate();
    this.getData({c:1})
  }
  
  back(){
    this.viewCtrl.dismiss();
  }

	info(item){
		this.navController.push(DowninfoPage,{info:item})
	}

  setCate(cate){
    this.catemenu = cate;
    this.getData({cid:cate});
  }

  getData(param){
    this.mineService.getDown(param).subscribe(res=>{
      if(res.code==0){
        this.list = res.value;
      }
    });
  }
  getDataCate(){
    this.mineService.getDowncate().subscribe(res=>{
      if(res.code==0){
        this.cate = res.value;
      }
    });
  }

}
