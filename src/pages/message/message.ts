import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { MessageService } from "./MessageService";
import { NativeService } from "../../providers/NativeService";
import { LoginPage } from "../login/login";
import { MsginfoPage } from "./msginfo/msginfo";
import { GlobalData } from "../../providers/GlobalData";

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  providers: [MessageService]
})
export class MessagePage {
  list : any = [];
  isLogin : any = false;
  hidemodal : any = false;
  isLoaded: number = 1;
  nowpage: number = 1;
  status : number = 0;
  isback: any = false;
  constructor(
  private nativeService: NativeService,
  public navCtrl: NavController,
  private globalData: GlobalData,
  public viewCtrl: ViewController,
  public messageService: MessageService, 
  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  back(){
    this.viewCtrl.enableBack()?this.viewCtrl.dismiss():'';
  }

  ionViewWillEnter(){
    this.viewCtrl.enableBack()?this.isback=true:this.isback=false;

    this.isLogined();

  }

  isLogined(){

    if( this.globalData.userId != ''){
        this.isLogin = true;
        this.getNotice('api=init');
      }else{
        this.isLogin = false;
        //this.goLogin();
      }      
  }

  goLogin(){
    this.list = [];
    this.hidemodal = true;
    this.navCtrl.push(LoginPage,{msg:1});
  }

  detail(id){
    this.navCtrl.push(MsginfoPage,{id:id});

  }

  ionViewWillLeave(){
    this.isLoaded = 1;
  }

  // 下拉加载更多
  doInfinite(infiniteScroll) {
    let page = this.nowpage + 1 ;
    if(this.isLoaded == 1){
      let params = "page="+page

      setTimeout(() => {
        
        if(this.status == 1){
           params += "&status=1"
        }
        if(this.status == 2){
           params += "&status=0"
        }
        
        this.messageService.getData(params).subscribe(res => {
          if(res.code==0 && res.value.length>0){
            for (var i = 0; i < res.value.length; i++) {
               this.list.push( res.value[i] );
             }
             this.nowpage = page;
          }else{
            this.isLoaded = 0;
            this.nativeService.showToast('已无更多数据');
          }
        });
        infiniteScroll.complete();
      }, 500);
    }else{
        infiniteScroll.complete();
    }

  }


  statusClick( s ){
    this.status = s;
    if(s==0){
      this.getNotice('api=init');
    }
    if(s==1){
      this.getNotice('status=1');
    }
    if(s==2){
      this.getNotice('status=0');
    }
  }

  del( id ,index ){
    this.messageService.delData(id).subscribe( res => {
      if(res.code==0){
        this.list.splice(index,1);
      }else{
        this.nativeService.showToast(res.message);
      }
      
    });
  }

  getNotice(param){
    
  	this.messageService.getData(param).subscribe( res => {
      if(res.code==0){
        this.list = res.value
      }
      if(res.code == 500){
        this.isLogin = false;
        //this.goLogin();
      }
  	});
  }

}
