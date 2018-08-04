import { Component, ViewChild } from '@angular/core';
import { MinePage } from '../mine/mine';
import { MessagePage } from '../message/message';
import { DemandPage } from '../demand/demand';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { InfoPage } from '../info/info';
import { Tabs } from "ionic-angular";
import { Storage} from '@ionic/storage';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  
  tabDemand = DemandPage ;
  tabDesign = HomePage;
  tab3Root=InfoPage;
  tab4Root = MinePage;


  noticeCount : any = '';
  userInfo : any = false;
  constructor( private storage: Storage ) {

  } 

  ionViewWillEnter() {
  	this.storage.get('UserInfo').then((value) => {
      console.log(value)
      if(value!=undefined){
        this.userInfo = value;
        if( value.notice > 0)
        	this.noticeCount = value.notice;
        else
        	this.noticeCount = '';

      }else{
        this.noticeCount = '';
      }
    });
  }

}
