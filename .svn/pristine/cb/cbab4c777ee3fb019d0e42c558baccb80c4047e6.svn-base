import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { MineService } from "../MineService";
import { ActionSheetController } from 'ionic-angular';
import { DowninfoPage } from "../downinfo/downinfo";
import { NativeService } from "../../../providers/NativeService";
import $ from 'jquery';

@Component({
  selector: 'page-down',
  templateUrl: 'down.html',
  providers: [MineService]
})
export class DownPage1 {
  catemenu:number = 0;
  cate:any = [];
  list:any = [];
  constructor(
  private navController: NavController,
  private viewCtrl: ViewController,
  private mineService: MineService,
  private nativeService: NativeService,
  public actionSheetCtrl: ActionSheetController
  ) {
    
  }

  //上传文件
  upIdcardThumb(type){
    this.presentActionSheet(type);
  }

  presentActionSheet(type) {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择上传途径',
      buttons: [
        {
          text: '文件',
          handler: () => {
            that.nativeService.getMultiplePicture({//从相册多选
              maximumImagesCount: 1,
              destinationType: 1//期望返回的图片格式,1图片路径
            }).subscribe(imgs => {
              console.log(imgs);
              this.nativeService.showToast('上传成功！');
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad(){
    this.getDataCate();
    this.getData({c:1})
  }
  
  back(){
    this.viewCtrl.dismiss();
  }

	info(item){
		this.navController.push(DowninfoPage,{info:item})
	}

  submits1(){
    var title=$("#title_text").val();
    var msg=$("#title_text_s1").val();
    var text=$("#select_s").val();
    if(title!=""&&msg!=""&&text!=""){
        /*$.ajax({
          type:"post",
          url:"",
          data:{
            title:title,
            msg:msg,
            text:text
          },
          dataType:"json",
          success:function(data){
            console.log(data);
          }
        })*/
    }else{
      this.nativeService.showToast('必选项不能为空！');
    }
  }
  setCate(cate){
    this.catemenu = cate;
    this.getData({cid:cate});
  }
  getData(param){
    this.mineService.getDown(param).subscribe(res=>{
      if(res.code==0){
        this.list = res.value;
      }
    });
  }
  getDataCate(){
    this.mineService.getDowncate().subscribe(res=>{
      if(res.code==0){
        this.cate = res.value;
      }
    });
  }

}
