import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../LoginService";
import { NativeService } from "../../../providers/NativeService";
import { LoginPage } from '../login';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [LoginService]
})

export class RegisterPage {
  registerForm: any;
  telphone: any;
  submitted: boolean = false;
  // 定时器
  private timer: any = false ;
  private num:number = 60;
  codeHtml: string = "获取验证码";
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private loginService: LoginService,
              private nativeService: NativeService,
              private formBuilder: FormBuilder) {

   
     this.registerForm = this.formBuilder.group({
      phone: [this.telphone, [Validators.required, Validators.minLength(11), Validators.pattern('1[0-9]{10}')]],// 第一个参数是默认值
      verificationCode: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });



  };

  confirm(user) {
    if(user.phone == '' || user.phone.length < 11 ){
      this.nativeService.showToast('请输入正确的手机号码');
      return false;
    }
    if(user.verificationCode == '' || user.verificationCode.length < 4 ){
      this.nativeService.showToast('请输入正确的验证码');
      return false;
    }
    if(user.password && user.password.length > 7){
      user.password = Md5.hashStr(user.password).toString();
    }else{
      this.nativeService.showToast('密码至少8位字符串');
      return false;
    }
    this.loginService.register(user)
      .subscribe(res => {
        if(res.code == 0 ){
          this.submitted = true;
            this.navCtrl.push(LoginPage);

        }else{
          this.nativeService.showToast(res.message);
          return false;
        }
      
      }, () => {
        this.submitted = false;
      });

  }

  getCode(){
    if(this.registerForm.value.phone && this.timer == false){
      this.codeHtml = "验证码发送中";

      this.loginService.sendcode('login/sendPublicCode/'+this.registerForm.value.phone+'/reg')
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

  dismiss() {

    this.viewCtrl.dismiss();
  }

  login() {

    this.navCtrl.setRoot(LoginPage);
  }


}
