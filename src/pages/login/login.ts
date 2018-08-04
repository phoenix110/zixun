import { Component } from '@angular/core';
import { ViewController, Events, NavParams, LoadingController} from 'ionic-angular';
import { Storage} from '@ionic/storage';
import { IonicPage, NavController } from 'ionic-angular';
import { RegisterPage } from "./register/register";
import { LoginService } from "./LoginService";
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalData } from "../../providers/GlobalData";
import { Utils } from "../../providers/Utils";
import { Helper } from "../../providers/Helper";
import { NativeService } from "../../providers/NativeService";
import { Wechats } from "../../providers/Wechats";
import { QQSDK,QQShareOptions } from '@ionic-native/qqsdk';
import $ from 'jquery';
declare var WeiboSDK :any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]

})
export class LoginPage {
  
  userInfo: any;
  captcheLogin: boolean = false;
  submitted: boolean = false;
  canLeave: boolean = false;
  noback: boolean = false;
  change_show1: boolean = false;
  loginForm: any;
  flag: string = '1';
  user: any;
  pwd: any;
  captche: any;
  remember: any;
  // 定时器
  private timer: any = false ;
  private num:number = 60;
  codeHtml: any = '获取验证码';

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private helper: Helper,
              private storage: Storage,
              private globalData: GlobalData,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              public qq:QQSDK,
              public wechats:Wechats,
              private events: Events,
              private nativeService: NativeService,
              private loginService: LoginService) {
    
   
      this.loginForm = this.formBuilder.group({
        phone: [this.user, [Validators.required, Validators.minLength(11)]],// 第一个参数是默认值
        flag: [this.flag,[Validators.required]],
        verificationCode: [this.captche, [Validators.minLength(4)]],
        password: [this.pwd, [Validators.minLength(4)]]
      });
    

  }

  show_s(num){
    if(num==2){
      this.change_show1=!this.change_show1;
      $("#password").attr("type","text");
    }else if(num==1){
      this.change_show1=!this.change_show1;
      $("#password").attr("type","password");
    }
  }
  // 长按
  onOpress(e){
    
  }


  ionViewWillEnter() {

    this.loginService.getUserinfo().subscribe(res => {
        if( res.code == 0){
          this.navCtrl.pop();
          return ;
        }
    })

    let ismsg = this.navParams.get('msg');

    if(ismsg && ismsg==1){
      this.noback = true;
    }
    this.canLeave = false;
    this.storage.get('LoginInfo').then(logInfo => {
      if( logInfo != undefined ){
        this.userInfo = logInfo;
        this.user = logInfo.username;
        this.pwd = logInfo.password;
        this.remember = true;
      }else{
        this.remember = false;
      }
    });
  }


  toRegister() {
    this.canLeave = true;
    this.navCtrl.setRoot(RegisterPage);
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  loginCode(f){
    if(f=='2'){
      this.captcheLogin = true;
    }
    else{
      this.captcheLogin = false;
    }
    this.flag = f;
  }
  
  qqLogin(){

    let loading = this.loadingCtrl.create({
        content: "跳转QQ登录中...",//loading框显示的内容
        dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
        showBackdrop: true  //是否显示遮罩层
      });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    const loginOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ,
    };

    this.qq.ssoLogin(loginOptions)
      .then((result) => {
        this.nativeService.showToast('token is ' + result.access_token);
        this.nativeService.showToast('userid is ' + result.userid);
      })
      .catch(error => {
        loading.dismiss();
        console.log(error);
      });
  }


  wxLogin(){
    this.wechats.weChatAuth();
   
  }

  sinaLogin(){
    let loading = this.loadingCtrl.create({
        content: "跳转新浪微博登录中...",//loading框显示的内容
        dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
        showBackdrop: true  //是否显示遮罩层
      });
    loading.present();
    let that = this
    WeiboSDK.ssoLogin(function (args) {
      console.log(args)
      that.nativeService.showToast('access token is ' + args.access_token);
      that.nativeService.showToast('userId is ' + args.userId);
    }, function (failReason) {
      loading.dismiss();
      that.nativeService.showToast(failReason+'!');
    });
    

  }

  doLogin(clientOptions){
    
  }

  ionViewDidLoad() {
    
  }

  ionViewCanLeave(): boolean {
      return true;
  }

  doremember(){
    this.remember = !this.remember;
  }

  login(user) {
    this.submitted = true;
    this.loginService.login(user)
      .subscribe(res => {
        let info = res.value;
        if(res.code == 0 ){
          this.storage.clear();//清除缓存
          Utils.sessionStorageClear();//清除数据缓存
        let login_info  = {
          username:info.telphone,
          password:user.password
        };
          
          this.storage.remove('token');

          info.password = user.password;
          this.storage.set('UserInfo',info);
          if(this.remember){
            this.storage.set('LoginInfo',login_info);
          }else{
            this.storage.remove('LoginInfo');
          }
          let tokens = {
            token:info.token,
            refreshToken:info.refreshToken,
            authTime:info.authTime
          };
          this.storage.set('token',tokens);

          this.globalData.authTime = new Date().getTime();
          this.globalData.token = info.token;
          this.globalData.idcode = info.idcode;
          this.globalData.refreshToken = info.refreshToken;
          this.globalData.authTime = info.authTime;
          this.globalData.userId = info.id;
          this.globalData.username = info.username;
          this.globalData.nickname = info.nickname;
          this.globalData.notice = info.notice;
          this.globalData.sex = info.sex;
          this.globalData.avatar = info.avatar;
          this.globalData.type = info.type;
          this.globalData.validate = info.validate;
          this.globalData.fullName = info.username;
          this.globalData.telphone = info.telphone;
          this.globalData.email = info.email;
          this.submitted = false;
          this.userInfo = info;
          this.events.publish('user:login', info);
          this.helper.setAlias(info.id);
          this.viewCtrl.dismiss(info);
          
        }else{
          this.nativeService.showToast(res.message);
          this.submitted = false;
          return false;
        }
      
      }, () => {
        this.submitted = false;
      });
  }


  getCaptche(){
    if(this.loginForm.value.phone && this.timer == false){
      this.codeHtml = "验证码发送中";

      this.loginService.sendcode('login/sendPublicCode/'+this.loginForm.value.phone+'/forget')
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



}
