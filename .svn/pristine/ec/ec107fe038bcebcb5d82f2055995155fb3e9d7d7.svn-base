import { Component } from '@angular/core';
import { ModalController,NavParams,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";
import { NativeService } from "../../../providers/NativeService";
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'page-updateinfo',
  templateUrl: 'updateinfo.html',
  providers: [MineService]
})
export class UpdateinfoPage {
	// 类型 1昵称username 2地区 area 3居住地址address 4擅长领域 skill 5联系电话 telphone 6个人说明 introduce
  type : number = 0;
  // 值
  val : any = '';

  uinfo:any = {};

  //数据绑定
  params : any = {};

  cityDatas: any[] = []; //城市数据
  cityData: any[] = []; //城市数据
  cityName:string = ''; //初始化城市名
  code: string; //城市编码

  skillData: any[] = []; //业务领域

  // 定时器
  private timer: any = false ;
  private num:number = 60;
  codeHtml: any = '获取验证码';
  
  constructor(
  private mineService: MineService,
  public modalCtrl: ModalController,
  public storage: Storage,
  private viewCtrl: ViewController,
  private nativeService: NativeService,
  public navParams: NavParams
  ) {

    this.type = this.navParams.get('type');
    this.val = this.navParams.get('val');
    
  };

  ionViewDidLoad() {

    this.storage.get('UserInfo').then(res=>{
      if(res){
        this.uinfo = res;
      }
    })
    
    //获取城市数据
    this.mineService.geCitys(0).subscribe(res => {
      this.cityDatas = res.value;
    })

    //业务领域
    if(this.type==4){
      this.mineService.geSkill().subscribe(res => {
      this.skillData = res.value;
    })
    }
  }

  ionViewWillEnter(){
  	
  }

  ionViewWillLeave(){
    
  }

  //城市选择器被改变时触发的事件
  cityChange(event) {
    this.val = event['region'].text
    this.code = event['region'].value
  }

  //业务领域点击
  skillClick( item ){
    this.val = item.name
    this.viewCtrl.dismiss({type:this.type,skill:item.name,id:item.id});
  }
  // 获取验证码
  getCode(){
    if(this.val && this.timer == false){
      this.codeHtml = "验证码发送中";

      this.mineService.sendcode('login/sendPublicCode/'+this.val+'/check')
      .subscribe(res => {
        if(res.code == 0 ){
          this.counttitme();
        }else{
          this.codeHtml = "获取验证码";
          this.nativeService.showToast(res.message);
          return false;
        }
      
      }, () => {
      });
    }else{
      console.log('倒计时中~')
    }
  }


   // 每一秒更新时间差
  counttitme() {
    this.timer = setInterval(() => {
      this.codeHtml = this.num + " s 后重发";
      this.num = this.num - 1 ;
      if(this.num==0){
        this.ngOnDestroyTimer();
      }
    }, 1000);
  }

  // 销毁组件时清除定时器
  ngOnDestroyTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.num = 60;
      this.timer = false;
      this.codeHtml = "获取验证码";
    }
  }

  dismiss(){
      this.viewCtrl.dismiss();
  }

  cityClick( item ){
    console.log(item)
    
    
    this.val = item.areaid
    if( item.areaid == 1 || item.areaid == 2 || item.areaid == 3 || item.areaid == 4 || item.areaid == 33 || item.areaid == 34){
      this.cityName = item.areaname; 
      this.viewCtrl.dismiss({type:this.type,areaid:this.val,areaname:this.cityName});
    }else if(<number>item.child>0){
      this.cityName = item.areaname; 

      this.mineService.geCitys(item.areaid).subscribe(res => {
        this.cityDatas = res.value;
      })
    }else{
      this.cityName += '-' + item.areaname; 
      this.viewCtrl.dismiss({type:this.type,areaid:this.val,areaname:this.cityName});
      
    }
  }

  // 保存信息
  confirm(){
    let type = this.type;
    
    if(type==1){
      this.viewCtrl.dismiss({type:1,nickname:this.val});
    }
    if(type==2){
      this.viewCtrl.dismiss({type:2,areaid:this.val});
    }
    if(type==3){
      this.viewCtrl.dismiss({type:3,address:this.val});
    }
    if(type==4){
      this.viewCtrl.dismiss({type:4,skill:this.val});
    }
    if(type==5){
      this.viewCtrl.dismiss({type:5,telphone:this.val});
    }
    if(type==6){
      this.viewCtrl.dismiss({type:6,introduce:this.val});
    }
    if(type==7){
      this.viewCtrl.dismiss({type:7,name:this.val});
    }
    if(type==8){
      this.viewCtrl.dismiss({type:8,idcard:this.val});
    }
    if(type==9){
      if(this.val!='' && this.val.length>=8){
      this.val =  Md5.hashStr(this.val).toString();
        this.mineService.saveinfo({id:this.uinfo.id,password:this.val}).subscribe(res=>{
          if(res.code == 0){
            this.viewCtrl.dismiss({type:9,password:this.val});
          }else{
            this.nativeService.showToast('数据保存失败！');
          }
        });
      }

    }
  	if(type==10){
      if(this.val!='' && this.val.length>=8){
      this.val =  Md5.hashStr(this.val).toString();
        this.mineService.saveinfo({id:this.uinfo.id,paypassword:this.val}).subscribe(res=>{
          if(res.code == 0){
            this.viewCtrl.dismiss({type:10,paypassword:this.val});
          }else{
            this.nativeService.showToast('数据保存失败！');
          }
        });
      }
    }
  }

}
