import { Component } from '@angular/core';
import { ModalController,NavController,NavParams,ViewController,ActionSheetController } from 'ionic-angular';
import { MineService } from "../MineService";
import { UpdateinfoPage } from "../updateinfo/updateinfo";
import { NativeService } from "../../../providers/NativeService";
import { FileService } from "../../../providers/FileService";
import { Storage } from '@ionic/storage';
import { FileObj } from "../../../model/FileObj";
import { APP_SERVE_URL } from "../../../providers/Constants";

@Component({
  selector: 'page-certify',
  templateUrl: 'certify.html',
  providers: [MineService]
})
export class CertifyPage {
	uinfo:any = {};
  // 用户更新的数据
  submitMap : any = {};
  dataForm: any = false;
  authStatus: any = '';
  upimg: any = false;
  upimg1: any = false;
  idcardthumb: string = '';
  idcardthumb1: string = '';
  // 定时器
  private timer: any = false ;
  private num:number = 60;
  codeHtml: string = "获取验证码";
  cityname:string = '';
  constructor(
  private mineService: MineService,
  public modalCtrl: ModalController,
  private storage: Storage,
  private viewCtrl: ViewController,
  public navCtrl: NavController, 
  private nativeService: NativeService,
  private fileService: FileService,
  public actionSheetCtrl: ActionSheetController,
  public navParams: NavParams
  ) {
    this.uinfo = this.navParams.get('uinfo');
    this.authStatus = this.uinfo.validate;
    this.submitMap = {
        name: '',
        idcard: '',
        now_areaid: 0,
        now_address: '',
        idcardthumb: '',
        idcardthumb1: '',
        code: ''
      } 

    
  };

  ionViewWillEnter(){
  	 this.getAuth()

  }

  ionViewWillLeave(){

  }

  getAuth(){
    this.mineService.getAuth().subscribe(res=>{
      if(res.code==0 && res.value.id != undefined ){
          
          this.authStatus = res.value.validate

          this.submitMap.name = res.value.name
          this.submitMap.idcard = res.value.idcard
          this.submitMap.idcards = res.value.idcards
          this.submitMap.now_areaid = res.value.now_areaid
          this.submitMap.now_address = res.value.now_address
          this.submitMap.idcardthumb = res.value.idcardthumb
          this.submitMap.idcardthumb1 = res.value.idcardthumb1
          this.upimg = true;
          this.upimg1 = true;
          this.idcardthumb = res.value.idcardthumbpath
          this.idcardthumb1 = res.value.idcardthumb1path
          this.cityname = res.value.areaname
      }
    })
  }

  resetForm(){
    this.authStatus = null;
  }


  //上传身份证照片
  upIdcardThumb(type){
    this.presentActionSheet(type);
  }

  presentActionSheet(type) {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择上传途径',
      buttons: [
        {
          text: '拍照',
          handler: () => {
              that.nativeService.getPictureByCamera({
                destinationType: 1//期望返回的图片格式,1图片路径
              }).subscribe(img => {
                that.getPictureSuccess(img,type);
              });
          }
        },{
          text: '相册',
          handler: () => {
              that.nativeService.getMultiplePicture({//从相册多选
                maximumImagesCount: 1,
                destinationType: 1//期望返回的图片格式,1图片路径
              }).subscribe(imgs => {
                for (let img of <string[]>imgs) {
                  that.getPictureSuccess(img,type);
                }
              });
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



  private getPictureSuccess(img,type) {
    
    
    if( img ){
    
        let fileObj = <FileObj>{'origPath': img,'thumbPath': img,'base64': img,"parameter":img};

        this.fileService.uploadByFilePath(fileObj).subscribe(result=>{
          if(type==1){
            this.submitMap.idcardthumb = result.origPath;
            if(result.parameter){
              this.idcardthumb = result.parameter;
            }else{
              this.idcardthumb = APP_SERVE_URL + result.origPath;
            }
            this.upimg = true;

          }else{
            this.submitMap.idcardthumb1 = result.origPath;
            if(result.parameter){
              this.idcardthumb1 = result.parameter;
            }else{
              this.idcardthumb1 = APP_SERVE_URL + result.origPath;
            }
            this.upimg1 = true;

          }

        });

      }

  }


  	presentProfileModal( type , val ) {
  		let modal = this.modalCtrl.create(UpdateinfoPage,{type:type,val:val});
	  	modal.onDidDismiss(data => {
        if(data == undefined){
          return 
        }

     		if(data.type==2){
     			this.submitMap.now_areaid = data.areaid;
          this.cityname = data.areaname
     		}if(data.type==3){
     			this.submitMap.now_address = data.address;
     		}if(data.type==7){
     			this.submitMap.name = data.name;
     		}if(data.type==8){
          this.submitMap.idcard = data.idcard;
     			this.submitMap.idcards = data.idcard;
     		}
	   });
	   modal.present();
	}

  // 保存信息
  save(){
    if(this.submitMap.name==''){
      this.nativeService.showToast('请输入姓名');
      return
    }
    if(this.submitMap.idcard==''){
      this.nativeService.showToast('请输入身份证号码');
      return
    }
    if(this.submitMap.now_areaid==0){
      this.nativeService.showToast('请输入地区');
      return
    }
    if(this.submitMap.now_address==''){
      this.nativeService.showToast('请输入详细地址');
      return
    }
    if(this.submitMap.idcardthumb==''){
      this.nativeService.showToast('请上传身份证正面照片');
      return
    }
    if(this.submitMap.idcardthumb1==''){
      this.nativeService.showToast('请上传身份证反面照片');
      return
    }
    if(this.submitMap.code==''){
      this.nativeService.showToast('请输入验证码');
      return
    }
  	let params = this.submitMap;
  		params.id = this.uinfo.id;
      params.telphone = this.uinfo.telphone;
  	if(params){  		

  		this.mineService.certify(params).subscribe(res=>{
  			if(res.code == 0){
          this.storage.remove("UserInfo");//清除登录数据
  				this.storage.set("UserInfo",res.value);//重新赋值
          this.nativeService.showToast('提交成功');
  				this.viewCtrl.dismiss(res.value);
  			}else{
  				this.nativeService.showToast(res.message);
  			}
  		});
  	}else{
  		this.viewCtrl.dismiss();
  	}	
  }

  getCode(){
    if(this.uinfo.telphone && this.timer == false){
      this.codeHtml = "验证码发送中";

      this.mineService.sendcode('login/sendPublicCode/'+this.uinfo.telphone+'/check')
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
  back(){
    this.viewCtrl.dismiss();
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


}
