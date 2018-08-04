import { Component } from '@angular/core';
import { DemandService } from "./DemandService";
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { DemandinfoPage } from './demandinfo/demandinfo';
import { NativeService } from "../../providers/NativeService";
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { GlobalData } from "../../providers/GlobalData";

/**
 * Generated class for the DemandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-demand',
  templateUrl: 'demand.html',
  providers: [DemandService]
})
export class DemandPage {
  //搜索字
  keywords: string = "";
  isLogin : any = false;
  //dom开关
  doms: any ;
  //客服电话 qq
  tel: any ;
  qq: any = '';
  // 参数
  params: any ;
  // 匹配表单
  pipeiForm: any;
  // 定时器
  private timer: any = false ;
  private num:number = 60;
  codeHtml: string = "获取验证码";
  submitted: any = false;
  // 数据列表
  list: any = [];
  //分类列表
  catelist: any = [];
  //子分类列表
  catelistson: any = [];
  //设计阶段列表
  designphaselist: any = [];
  //服务列表
  servicelevellist: any = [];
  //筛选框显示
  showCate: any = false;
  //匹配任务框显示
  pipei: any = false;
  // 栏目切换
  menu: number = 2;
  //当前页
  nowpage: number = 1;
  //总页数
  totalpage: number = 10;
  // 当前分类id
  cate: number = 0;
  // 当前子分类id
  cateson: number = 0;
  // 匹配数据
  pipeiData:any ;
  // 今日上线匹配数
  pipeiCount: number = 5;
  // 团队介绍100字长度以内
  pipeiIntroLen: number = 100;
  constructor(
  public navCtrl: NavController, 
  public globalData: GlobalData, 
  private demandService: DemandService,
  private nativeService: NativeService,
  private actionSheetCtrl: ActionSheetController,
  private storage: Storage,
  private formBuilder: FormBuilder,
  public navParams: NavParams) {

      this.doms = {
        catesonOpen: false,
        cateOpen: false,
        status: false,
        amount: false,
        designphase: false,
        servicelevel: false
      } 

      this.params = {
        cate:this.cate,
        child:this.cateson,
        status:-1,
        amount:-1,
        design:0,
        designchild:0,
        page:1,
        keywords:'',
        recommend:'',
        order:this.menu
      };

      this.pipeiData = {
        title:'匹配任务',
        phone:'',
        captche:'',
        uid:'0',
        person:'',
        intro:''
      }


      this.pipeiForm = this.formBuilder.group({
        phone: [this.pipeiData.phone, [Validators.required, Validators.minLength(11)]],// 第一个参数是默认值
        title: [this.pipeiData.title],
        captche: [this.pipeiData.captche, [Validators.minLength(4)]],
        uid: [this.pipeiData.uid],
        person: [this.pipeiData.person,[Validators.required]],
        intro: [this.pipeiData.intro,[Validators.required]]
      });

  }

  ionViewWillEnter(){
    if(this.globalData.param=1){
        setTimeout(() => {
          document.getElementById('searbar_txt').click();
          document.getElementById('searbar_txt').focus();
        },500);
    }

    this.storage.get('kf').then(res=>{
      this.tel = res.tel;
      this.qq = res.qq;
    });
  	this.nativeService.isLogin().then(res=>{
      if(res && res.id ){
        this.isLogin = res
      }else{
        this.isLogin = false;
      }
    });

      setTimeout(() => { //2秒内没有再次
        if(this.list.length<1){
          this.getListInit({order:2});
        }
        if(this.catelist.length<1){
          this.getCate(0,'');
        }
        if(this.designphaselist.length<1){
          this.getDesignphase(0,'');
        }
      }, 1000)

  }

  // 页面加载完后执行
  ionViewDidLoad() {
    //获取列表数据
    this.getListInit({order:2});
    //获取大分类
    this.getCate(0,'');
    //获取设计阶段
    this.getDesignphase(0,'');
  }
  //页面离开执行事件
  ionViewWillLeave(){
    //关闭匹配编辑框
    this.pipei = false;
    // 关闭条件删选框
    this.showCate = false;
    // 初始化页数为1
    this.nowpage = 1;
    // 撤销首页进入聚焦光标
    this.globalData.param = 0;
  }

  //获取设计阶段
  getDesignphase(c,t){
    this.nowpage = 1;
    this.params.page = 1;
    this.demandService.getDesignphase(c).subscribe(res => {
      if(c==0 && res.code == 0){
          this.designphaselist = res.value;
          this.servicelevellist = [];
      }
      if(c>0 && res.code == 0){
          if(t=='designphase'){
            this.servicelevellist = res.value;

          }else{
            
          }
      }
    });
  }
  //获取分类
  getCate(c,t){
    this.nowpage = 1;
    this.params.page = 1;
    this.demandService.goCateDemand(c).subscribe(res => {
      if(c==0 && res.code == 0){
          this.catelist = res.value;
          this.catelistson = [];
      }
      if(c>0 && res.code == 0){
          if(t==1){

          }else{
            this.catelistson = res.value;
          }
      }
    });
  }

  // 大分类 点击全部开关
  cateOpen(){
    this.doms.cateOpen = !this.doms.cateOpen;
  }

  // 子分类 点击全部开关
  catesonOpen(){
    this.doms.catesonOpen = !this.doms.catesonOpen;
  }

  //设计阶段 开关
  designphaseOpen(){
    this.doms.designphase = !this.doms.designphase;
  }
  //任务状态 开关
  statusOpen(){
    this.doms.status = !this.doms.status;
  }
  //任务金额 开关
  amountOpen(){
    this.doms.amount = !this.doms.amount;
  }
  // 设计阶段 任务状态 现场技术服务 任务金额 点击筛选事件 id主键 type类型
  allClick(id,type){
    if(type=='designphase'){
        this.params.design = id;
        this.getDesignphase(id,type);
    }
    if(type=='service'){
        this.params.designchild = id;
        //this.getDesignphase(id,type);
    }
    if(type=='status'){
        this.params.status = id;
    }
    if(type=='amount'){
        this.params.amount = id;
    }
    console.log(this.params.status)
    this.nowpage = 1;
    this.params.page = 1;
  }
  // 分类循坏数据点击事件
  cateClick(cate,t){
    if(t==1){
      if(cate)
        this.cateson = cate.id;
      else
        this.cateson = 0;
      this.params.child = this.cateson ;
      if(cate!=0)
        this.getCate(this.cateson,t);

    }else{
      if(cate){
        this.cate = cate.id;
        this.cateson = 0;
      }
      else
        this.cate = 0;

        if(this.cate==-1){
          this.params.cate = 0 ;
        }else{
          this.params.cate = this.cate ;

        }

        this.nowpage = 1;
    this.params.page = 1;
    this.getCate(this.cate,t);

    }
  }

  // 上拉刷新
  doRefresh(refresher){
    this.getList({order:this.menu});
     setTimeout(() => {
       refresher.complete();
     }, 3000);

  }

  // 下拉加载更多
  doInfinite(infiniteScroll) {
    let page = this.nowpage + 1 ;
    setTimeout(() => {
      this.params.page = page;
      this.demandService.getList(this.params).subscribe(res => {
        if(res.code==0 && res.value.length>0){
          for (var i = 0; i < res.value.length; i++) {
             this.list.push( res.value[i] );
           }
           this.nowpage = page;
        }else{
          this.nativeService.showToast('已无更多数据');
        }
      });
      infiniteScroll.complete();
    }, 500);
  }

  // 确定筛选框
  confirmCate(){
    this.showCate = false;
    
    this.nowpage = 1;
    this.params.page = 1;
    this.demandService.getList2(this.params).subscribe(res => {
      this.list = res.value;
    });
  }
   // 取消筛选事件
  cancelCate(){
    this.showCate = false;
  }


  // 列表数据点击事件
  itemClick( item ){
    this.navCtrl.push(DemandinfoPage,{info:item});
  }

  // 显示分类点击事件
  doCate(){
    this.showCate = !this.showCate;
  }
  // 取消匹配框事件
  cancelPipei(){
    this.pipei = false;

  }

  // 确定匹配框事件
  addPipei( data ){
    
    if(this.isLogin==false){
      this.nativeService.showToast('请登录后再操作！');
      return false;
    }

    this.pipeiData.uid = this.isLogin.id;
    data.uid = this.isLogin.id;

    if(this.pipeiCount>0){

    this.demandService.addpipei(data).subscribe(res => {
        if(res && res.code == 0){
          this.pipeiCount = this.pipeiCount - 1;
          if(this.pipeiCount<=0){
            this.pipeiCount = 0;
          }
          this.pipei = false;
          this.pipeiIntroLen = 100;
          this.pipeiData.intro = '';
          this.nativeService.showToast('操作成功！');
        }else{
          this.nativeService.showToast(res.message);
        }
    });
    }else{
      this.nativeService.showToast('操作失败，您今日匹配次数已达上限！');
    }
  }

  // 获取列表函数
  getList(order){
    this.demandService.getList(order).subscribe(res => {
      this.list = res.value;
      this.totalpage = res.totalpage
    });
  }

  // 获取列表函数 首次加载显示loading
  getListInit(order){
    this.demandService.getListing(order).subscribe(res => {
      if(res.code==0){
        this.list = res.value;
        this.totalpage = res.totalpage
      }
    });
  }


  // 我要推荐事件
  tj(){
    if(this.isLogin){

    this.pipei = true;
    }else{
      this.nativeService.showToast('请登录后再操作！');
    }
  }

  //客服
  kf(){
        
      let actionSheet = this.actionSheetCtrl.create({
        title: '客服',
        buttons: [
          {
            text: '点击拨打电话',
            role: 'destructive',
            handler: () => {
              this.nativeService.callNumber(this.tel);
            }
          },{
            text: '电话'+' '+this.tel,
            role: 'destructive',
            handler: () => {
              console.log('拨打电话',this.tel);
              this.nativeService.callNumber(this.tel);
            }
          },{
            text: '客服QQ'+' '+this.qq,
            handler: () => {
              console.log('客服QQ',this.qq);
            }
          },{
            text: '关闭',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
  }

  // 获取列表数据 无遮罩获取数据
  getData(order){
    this.menu = order;
    this.params.order = order;
    this.params.page = 1;
    this.params.status = -1;
    this.params.amount = -1;
    this.params.design = 0;
    this.params.designchild = 0;
    this.cate = 0;
    this.cateson = 0;
    this.params.child = 0;
    this.keywords = '';
    let parma : any = {order:order};
    if(order==3){
      this.params.recommend = 3;
      parma = {order:order,recommend:3}
    }else{
      this.params.recommend = '';
    }
    this.demandService.getList(parma).subscribe(res => {
    if(res.code==0){
      this.list = res.value;
    }
    });
  }


  onCancel(ev: any){
   
    
  }

  onClear(ev: any){
    

  }
  
  searchDemand(){
    this.nowpage = 1;
    this.params.page = 1;
    this.params.keywords = this.keywords;
    this.demandService.getList2(this.params).subscribe(res => {
      this.list = res.value;
    });
  }

  onSearchKeyUp(event){
    if("Enter"==event.key){
      this.searchDemand();
    }
  }

  getCode(){
    if(this.pipeiForm.value.phone && this.timer == false){
      this.codeHtml = "验证码发送中";

      this.demandService.sendcode('login/sendPublicCode/'+this.pipeiForm.value.phone+'/no')
      .subscribe(res => {
        if(res.code == 0 ){
          this.counttitme();
        }else{
          this.codeHtml = "获取验证码";
          this.nativeService.showToast(res.message);
          this.submitted = false;
          return false;
        }
      
      }, () => {
        this.submitted = false;
      });
    }else{
      if(!this.pipeiForm.value.phone){
        this.nativeService.showToast('请输入手机号码！');
      }
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
  blurInput(ev){
    this.pipeiIntroLen = 100 - this.pipeiData.intro.length;
    this.pipeiIntroLen = this.pipeiIntroLen > 0 ? this.pipeiIntroLen : 0;
    
  }

}
