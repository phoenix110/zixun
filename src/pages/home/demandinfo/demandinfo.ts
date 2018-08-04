import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { NativeService } from "../../../providers/NativeService";
import { DemandService } from "../../demand/DemandService";
import { Storage } from '@ionic/storage';
import { PayPage } from '../../demand/pay/pay';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-demandinfo',
  templateUrl: 'demandinfo.html',
  providers: [DemandService]
})
export class DemandinfoPage {
	
  info: any = {};
  // 弹层
  box1: any = false;
  box2: any = false;
  // 查看流程
  step: any = false;
  iscollect: any = false;
  number: any = '';
  progress: number = 0;
	dooffermsg: string = '竞标失败！您当前已有任务，不能再竞标，请完成任务后再竞标！';
  offerList: any = [];
  xslist: any = [];
  allinfo: any = {};
  userinfo:any = {};
  constructor(public storage: Storage,public navCtrl: NavController,public nativeService: NativeService, public navParams: NavParams,private demandService: DemandService,private transfer: FileTransfer,private viewCtrl: ViewController,private fileOpener: FileOpener) {
    this.getUser();
  }
        

  ionViewWillEnter(){
    let data = this.navParams.get("info");
    this.info = data;
    this.number = data.number;
    this.getInfo();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  
  getUser(){
    this.storage.get('UserInfo').then(res=>{
      this.userinfo = res;
    });
  }

  ionViewDidLoad() {
    

  }

  viewStep(){
    this.step = !this.step;
  }

  //下载附件
  downfile(){
    let that = this;
    const fileTransfer: FileTransferObject = that.transfer.create();
    let savepath = 'file:///storage/sdcard0/YoukongmaDownload/' + that.number+'.zip';

    that.demandService.downfileforDemand(that.number).subscribe(res => {

      if(res.code == 0){
          that.nativeService.showLoading('下载中...');
          fileTransfer.download( res.value , savepath ).then((entry) => {
            that.nativeService.hideLoading();
            that.nativeService.showToast('文件下载成功');
            that.openFiles(entry)            
          },err => {
            that.nativeService.showToast('抱歉，文件不存在，无法下载！');
          })

          // 进度
          fileTransfer.onProgress(progressEvent => {
            if (progressEvent.lengthComputable) {
              // 下载过程会一直打印，完成的时候会显示 1
              that.progress = ((progressEvent.loaded / progressEvent.total)*100) ;
               console.log(that.progress);
            }
          });

      }else{
        that.nativeService.showToast('抱歉，文件不存在，无法下载！');
      }
    })     

  }

  
  openFiles( entry ){
      
      this.fileOpener.open( entry.nativeURL , 'application/zip')
      .then(() => console.log('file opend'))
      .catch(e => this.nativeService.showToast('抱歉，文件打开失败！'));
  }

  getFileMimeType(fileType: string): string {
    let mimeType: string = '';

    switch (fileType) {
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'pptx':
        mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'xlsx':
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'zip':
        mimeType = 'application/x-zip-compressed';
        break;
      case 'rar':
        mimeType = 'application/octet-stream';
        break;
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      default:
        mimeType = 'application/' + fileType;
        break;
    }
    return mimeType;
  }

  getInfo(){

    this.demandService.getDetail(this.number).subscribe(res => {
      this.iscollect = res.value.iscollect;
      this.allinfo = res.value;
      this.info = res.value.demand;
      this.offerList = res.value.offerlist;
      this.xslist = res.value.xslist;
    });
  }
  
  collect(){
    this.demandService.doCollect(this.info.id).subscribe(res => {
      if(res.code==0){
        this.iscollect = !this.iscollect;
      }else{
        this.nativeService.showToast(res.message);
      }
    });
  }

  dooffer(){
    this.box1 = true;
    
  }

  canceloffer(){
    this.box1 = false;
    this.box2 = false;
  }

  // 支付保证金
  payBond(){
    this.navCtrl.push(PayPage,{info:this.info});
  }

  saveoffer(){
    this.box1 = false;
    this.demandService.doOffer(this.number).subscribe(res => {
      if(res.code==0){
        this.getInfo();
        this.nativeService.showToast('竞标成功！');
      }else{
        this.box2 = true;
        this.dooffermsg = res.message;
      }
    });
  }
}
