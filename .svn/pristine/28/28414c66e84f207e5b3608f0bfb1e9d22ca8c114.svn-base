import { Component } from '@angular/core';
import { ModalController,NavController,NavParams,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";
import { UpdateinfoPage } from "../updateinfo/updateinfo";
import { NativeService } from "../../../providers/NativeService";
import { FileService } from "../../../providers/FileService";
import { Storage } from '@ionic/storage';
import { FileObj } from "../../../model/FileObj";

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
  providers: [MineService]
})
export class InfoPage {
	// 用户数据
  uinfo : any;
  // 用户更新的数据
  submitMap : any = {};
  upAvatarModal : any = false;
  setSexModal : any = false;
  constructor(
  private mineService: MineService,
  public modalCtrl: ModalController,
  private storage: Storage,
  private viewCtrl: ViewController,
  public navCtrl: NavController,
  private nativeService: NativeService,
  private fileService: FileService,
  public navParams: NavParams
  ) {
    this.uinfo = this.navParams.get('uinfo');
  };

  ionViewWillEnter(){
  }

  ionViewWillLeave(){

  }

  back(){
    this.viewCtrl.dismiss();
  }

  // 性别点击事件 模态框显示
  sexClick(){
  	this.setSexModal = true;
  }

  // 头像点击事件 模态框显示
  avatarClick(){
  	this.upAvatarModal = true;
  }

  // 选择性别事件
  setSex( num ){
  	if(num==0){
  		this.setSexModal = false;
  		return
  	}
  	this.uinfo.sex = num;
  	this.submitMap.sex = num;
  	this.setSexModal = false;
  }

  // 选择上传头像事件
  upAvatar( type ){

    let that = this;

  	this.upAvatarModal = false;

  	// 取消 模态框关闭
  	if(type==0){
  		this.upAvatarModal = false;
  	}

  	//拍照
  	if(type==1){
  		that.nativeService.getPictureByCamera({
          destinationType: 1//期望返回的图片格式,1图片路径
        }).subscribe(img => {
          that.getPictureSuccess(img);
        });
  	}

  	//手机相册选择
  	if(type==2){
  		that.nativeService.getMultiplePicture({//从相册多选
          maximumImagesCount: 1,
          destinationType: 1//期望返回的图片格式,1图片路径
        }).subscribe(imgs => {
          for (let img of <string[]>imgs) {
            that.getPictureSuccess(img);
          }
        });
  	}
  }

  private getPictureSuccess(img) {

    let that = this;

    if( img ){

        let fileObj = <FileObj>{'origPath': img,'thumbPath': img,'base64': img,"parameter":''};

        this.fileService.uploadByFilePath(fileObj).subscribe(result=>{

          that.uinfo.avatar = result.thumbPath;
          that.submitMap.avatar  = result.origPath;
        });

      }

  }


  	presentProfileModal( type , val ) {
  		let modal = this.modalCtrl.create(UpdateinfoPage,{type:type,val:val});
		console.log(modal);
	  	modal.onDidDismiss(data => {
	  		if(data == undefined){
	  			return
	  		}
     		if(data.type==1){
     			this.uinfo.nickname = data.nickname;
     			this.submitMap.nickname = data.nickname;
     		}if(data.type==2){
     			this.uinfo.area = data.areaname;
     			this.submitMap.areaid = data.areaid;
     		}if(data.type==3){
     			this.uinfo.address = data.address;
     			this.submitMap.address = data.address;
     		}if(data.type==4){
     			this.uinfo.skill = data.skill;
     			this.submitMap.skill = data.skill;
     		}if(data.type==5){
     			this.uinfo.telphone = data.telphone;
     			this.submitMap.telphone = data.telphone;
     		}if(data.type==6){
     			this.uinfo.introduce = data.introduce;
     			this.submitMap.introduce = data.introduce;
     		}
	   });
	   modal.present();
	}

  // 保存信息
  saveinfo(){
  	let params = this.submitMap;
  		params.id = this.uinfo.id;
  	if(params){

  		this.mineService.saveinfo(params).subscribe(res=>{
  			if(res.code == 0){
                this.storage.remove("UserInfo");//清除登录数据
  				this.storage.set("UserInfo",res.value);//重新赋值
  				this.viewCtrl.dismiss(res.value);
  			}else if(res.code==1){
  				this.nativeService.showToast('昵称已存在,请修改昵称！');
  			}else{
				this.nativeService.showToast('数据保存失败！');
			}
  		});
  	}else{
  		this.viewCtrl.dismiss();
  	}
  }

}
