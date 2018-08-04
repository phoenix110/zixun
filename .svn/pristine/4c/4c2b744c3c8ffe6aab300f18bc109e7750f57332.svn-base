import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { DemandinfoPage } from './demandinfo/demandinfo';
import { HomeService } from "./HomeService";
import { FILE_SERVE_URL } from "../../providers/Constants";
import { NativeService } from "../../providers/NativeService";
import { Storage } from '@ionic/storage';
import { GlobalData } from "../../providers/GlobalData";
import { UserPage } from "../mine/user/user";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]

})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  keywords: string = "";
  list: any = [];
  cate: any = [];
  news: any = [];
  designers: any = [];
  banner: any = [];
  allcount: any = 0;
  alltotal: any = 0;
  fileurl: any = "";
  searchQuery: string = '';
  items: string[];
  search: any = false;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  private storage: Storage,
  private globalData: GlobalData,
  private nativeService: NativeService,
  private homeService: HomeService) {
    
  }


  ionViewWillEnter() {  

    setTimeout(() => { //2秒内没有再次
       if(this.list.length<1){
          this.getToken();
        }
    }, 1000)
    
  }

  ionViewDidLoad() {
    this.fileurl = FILE_SERVE_URL;
    this.getToken();
    this.storage.get('UserInfo').then(UserInfo => {
        if(UserInfo){
          this.globalData.loginTime = UserInfo.logintime;
          this.globalData.userId = UserInfo.id;
          this.globalData.idcode = UserInfo.idcode;
          this.globalData.username = UserInfo.username;
          this.globalData.nickname = UserInfo.nickname;
          this.globalData.fullName = UserInfo.username;
          this.globalData.notice = UserInfo.notice;
          this.globalData.type = UserInfo.type;
          this.globalData.sex = UserInfo.sex;
          this.globalData.validate = UserInfo.validate;
          this.globalData.avatar = UserInfo.avatar;
          this.globalData.email = UserInfo.email;
          this.globalData.telphone = UserInfo.telphone;
        }

    });
    
  }

  user( item ){
    console.log(item)
    this.navCtrl.push(UserPage,{uinfo:item});

  }

  itemClick(item){

    this.navCtrl.push(DemandinfoPage,{info:item});

  }


  inputFocus(){
    this.globalData.param = 1;
    this.navCtrl.parent.select(1);
  }

  searchDemand(){
    
  }

  getNew(){
    this.homeService.getNew().subscribe(res => {
      this.news = res.value;
    });
  }

  goCateDemand( cid ){
      this.homeService.goCateDemand(cid).subscribe(res => {
          this.list = res.value;
      });

  }
  getToken(){
    let that = this;
    this.storage.get('token').then(res=>{
      let nowtime = new Date().getTime();
      if( res == null || (res.token && res.refreshToken * 1000 <= nowtime) || !res.token ){
        this.homeService.getToken().subscribe(res => {
          if(res && res.code == 0){
              this.globalData.token = res.value.token;
              this.globalData.refreshToken = res.value.expires;
              this.globalData.authTime = res.value.authTime;
              let tokens = {
                token:res.value.token,
                refreshToken:res.value.expires,
                authTime:res.value.authTime,
              }
              this.storage.set('token',tokens)
              that.getData();
          }else{
            this.nativeService.showToast('秘钥获取失败!')
          }
          this.nativeService.hideLoading();
        },err=>{
            this.nativeService.hideLoading();
            this.nativeService.showToast('网络错误!')
        });
      }else{
        this.globalData.token = res.token;
        this.globalData.refreshToken = res.refreshToken;
        this.globalData.authTime = res.authTime;
        that.getData();
      }
    });
    
  }
  getData(){
    this.nativeService.showLoading();
    this.homeService.getData().subscribe(res => {
      if(res && res.code == 0){
        this.storage.set('kf',{tel:res.value.tel,qq:res.value.qq});
        this.news = res.value.new;
        this.list = res.value.hot;
        this.designers = res.value.designer;
        this.cate = res.value.cate;
        this.banner = res.value.banner;
        this.allcount = res.value.all_demand_count;
        this.alltotal = res.value.all_demand_total;
      }else{
        if(res.code == 403){
          this.storage.remove('token');
          this.getToken();
        }else{

          this.nativeService.showToast('数据获取失败!')
        }
      }
      this.nativeService.hideLoading();
    },err=>{
        this.nativeService.hideLoading();
        this.nativeService.showToast('网络错误!')
    });
  }


  goDemand(){
    this.navCtrl.parent.select(1);
  }

}
