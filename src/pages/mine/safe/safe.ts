import { Component } from '@angular/core';
import { ModalController,NavController,NavParams,ViewController,AlertController } from 'ionic-angular';
import { MineService } from "../MineService";
import { NativeService } from "../../../providers/NativeService";
import { Storage } from '@ionic/storage';
import { GlobalData } from "../../../providers/GlobalData";
import { Utils } from "../../../providers/Utils";
import { BindemailPage } from "../bindemail/bindemail";
import { UpdateinfoPage } from "../updateinfo/updateinfo";

@Component({
  selector: 'page-safe',
  templateUrl: 'safe.html',
  providers: [MineService]
})
export class SafePage {
	// 用户数据
  uinfo : any;
  // 用户更新的数据
  submitMap : any = {};
  constructor(
  private mineService: MineService,
  public modalCtrl: ModalController,
  private storage: Storage,
  private globalData: GlobalData,
  private viewCtrl: ViewController,
  public alertCtrl: AlertController,
  public navCtrl: NavController, 
  private nativeService: NativeService,
  public navParams: NavParams
  ) {
    this.uinfo = this.navParams.get('uinfo');
    
  };

  ionViewWillEnter(){
  	console.log(this.uinfo)
    this.getUser()
  }

  ionViewWillLeave(){

  }

  back(){
    this.viewCtrl.dismiss();
  }

  getUser(){
    this.mineService.getUserinfo().subscribe(result => {
        
        if(result.code==500){
          
        }

        if(result.code==0){
          let value = result.value;
          this.uinfo = value;
          this.globalData.userId = value.id;
          this.globalData.idcode = value.idcode;
          this.globalData.username = value.username;
          this.globalData.nickname = value.nickname;
          this.globalData.fullName = value.name;
          this.globalData.sex = value.sex;
          this.globalData.telphone = value.telphone;
          this.globalData.avatar = value.avatar;
          this.globalData.validate = value.validate;
          this.globalData.type = value.type;
        }
    })
  }

   bindmail(){
     let profileModal = this.modalCtrl.create(BindemailPage, this.uinfo);
     profileModal.onDidDismiss(data => {
       if(data){
          this.uinfo.email = data
          this.submitMap.email = data
       }
     });
     profileModal.present();
  }


  	

  // 保存信息
  saveinfo(){
  	let params = this.submitMap;
  		params.id = this.uinfo.id;
  	if(params){  		

  		this.mineService.saveinfo(params).subscribe(res=>{
  			if(res.code == 0){
              	
  				this.viewCtrl.dismiss(res.value);
  			}else{
  				this.nativeService.showToast('数据保存失败！');
  			}
  		});
  	}else{
  		this.viewCtrl.dismiss();
  	}	
  }

  doOut(){
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确定要注销账户吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('取消注销账户');
          }
        },
        {
          text: '注销',
          handler: () => {
            this.mineService.doOut(this.uinfo.id).subscribe(res => {
            if(res.code==0){
              this.globalData.userId = '';
              this.globalData.idcode = '';
              this.globalData.username = '';
              this.globalData.nickname = '';
              this.globalData.fullName = '';
              this.globalData.sex = 0;
              this.globalData.telphone = '';
              this.globalData.avatar = '';
              this.globalData.validate = 0;
              this.globalData.type = 0;
              this.storage.set("UserInfo","");//清除登录数据
              this.storage.remove("UserInfo");//清除登录数据
              Utils.sessionStorageClear();//清除数据缓存
              this.viewCtrl.dismiss();

            }else{
              console.log('注销账户失败')
            }
            });
          }
        }
      ]
    });
    confirm.present();
  }


  presentProfileModal( type , val ) {
      let modal = this.modalCtrl.create(UpdateinfoPage,{type:type,val:val});
      modal.onDidDismiss(data => {
        if(data == undefined){
          return 
        }
        if(data.type==9){
          this.submitMap.password = data.password;
        }if(data.type==10){
          this.submitMap.paypassword = data.paypassword;
        }
     });
     modal.present();
  }

}
