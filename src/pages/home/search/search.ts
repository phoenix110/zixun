import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NativeService } from "../../../providers/NativeService";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  keywords: string = "";
	items: string[];
	active : any ;
  constructor(
  private viewCtrl: ViewController,
  private nativeService: NativeService

  ) {
  	this.active = false;

    this.initializeItems();
  };

  ionViewWillEnter(){
  }

  onInput(ev: any){
  	this.active = true;
    this.getItems(ev)
  }

  onCancel(ev: any){
  	this.active = false;
  	this.dismiss();
  }

  onClear(ev: any){
  	this.active = false;

  }

  searchDemand(){
  }	

  more(){
  this.nativeService.showToast("已无更多热搜！");
  }	

  initializeItems() {
    this.items = [
      '	工厂废气处理',
      '交通绿化',
      '城市噪音处理',
      '污水处理',
      '东湖水净化',
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  dismiss() {
   this.viewCtrl.dismiss();
 }
  

}
