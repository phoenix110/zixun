
import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { NavController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { NativeService } from "../../providers/NativeService";
import { BrowserPage } from '../browser/browser';
//@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'info.html',  
})
export class InfoPage {
  menu: number = 2;
  url_prefix="";//"http://renrenyoukong.com/";
  public items:any= [];  
  no_result:any;  
  nowpage:any; 
  constructor(public navCtrl: NavController,
    private nativeService: NativeService,public http: Http) {
      this.http = http;
      this.nowpage=1;
      this.getList_zixun(1,this.menu);
  }
 buttonClick(event){
   console.log("button clicked");
   console.log(event);
  }
 
  itemClicked(event,itemData){ 
    //console.log(event);
    /*let share: ShareModel = new ShareModel();
            share.title = '标题';
            share.banner = '标语提示';
            share.thumb = '缩略图';
            share.descr = '描述';
            share.url = '分享的链接';*/
    this.navCtrl.push(BrowserPage, {
      browser: { 
          title: '',
          url: itemData.pic_web_url,
          share:{"title":itemData.pic_title,"banner":"","thumb":itemData.pic_url,"descr":itemData.detail,"url":itemData.pic_web_url}
      }
    });  
    /*
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: '#3573bbff'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true,
        staticText: '详细信息'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      }, 
    };
    //window.open('http://renrenyoukong.com','_self');
    //console.log("item clicked");
    
    //console.log(itemData.pic_web_url);
    //this.navCtrl.push(InfodetailPage, {});
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(itemData.pic_web_url, '_self', options);
 
    browser.on('closePressed').subscribe(data => {
      browser.close(); 
    })
    */
  }  

  doRefresh(refresher){
     this.nowpage = 1;
     this.getList_zixun(this.nowpage,this.menu);
     setTimeout(() => {
       refresher.complete();
     }, 3000);

  }

  // 下拉加载更多
  doInfinite(infiniteScroll) {
    //this.nowpage = this.nowpage + 1 ;
    this.getList_zixun(this.nowpage,this.menu);
    setTimeout(() => {       
      infiniteScroll.complete();
    }, 500); 
  }

  getList_zixun(page_num,order){
    //page_num=1;
    this.http.get("http://47.93.237.6/zixun.php?page="+page_num)
    .subscribe(data =>{  
     //console.log(data['_body']); 
     let r=JSON.parse(data['_body']).result;      
     if(r && r.length>0) {
      if (page_num==1) this.items=r;//第一次/页加载
      else  this.items=this.items.concat(r);
      this.nowpage = page_num + 1 ;
     }
     else this.nativeService.showToast('已无更多数据');
      

    },error=>{  
        this.no_result=JSON.stringify(error); 
        //console.log(error);// Error getting the data
    } );
  }

  
  // 获取列表数据 无遮罩获取数据
  getData(order){
    this.menu = order;
    this.getList_zixun(1,order);

  }
}