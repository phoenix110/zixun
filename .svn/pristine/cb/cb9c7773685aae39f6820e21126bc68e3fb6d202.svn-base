import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginModule } from '../pages/login/login.module';
import { MineModule } from '../pages/mine/mine.module';
import { DemandModule } from '../pages/demand/demand.module';
import { MessageModule } from '../pages/message/message.module';
import { HomeModule } from '../pages/home/home.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppVersion } from "@ionic-native/app-version";
import { Camera } from "@ionic-native/camera";
import { Toast } from "@ionic-native/toast";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AppMinimize } from "@ionic-native/app-minimize";
import { ImagePicker } from "@ionic-native/image-picker";
import { Network } from "@ionic-native/network";
import { CodePush } from "@ionic-native/code-push";
import { CallNumber } from "@ionic-native/call-number";
import { Alipay } from '@ionic-native/alipay';
import { QQSDK } from '@ionic-native/qqsdk';

import { HttpModule } from "@angular/http";
import { NativeService } from "../providers/NativeService";
import { FileService } from "../providers/FileService";
import { HttpService } from "../providers/HttpService";
import { Utils } from "../providers/Utils";
import { GlobalData } from "../providers/GlobalData";
import { Helper } from "../providers/Helper";
import { Logger } from "../providers/Logger";
import { ENABLE_FUNDEBUG, IS_DEBUG, FUNDEBUG_API_KEY } from "../providers/Constants";
import { Diagnostic } from "@ionic-native/diagnostic";
 
//安装依赖:cnpm i fundebug-javascript --save
//https://docs.fundebug.com/notifier/javascript/framework/ionic2.html
declare var require: any;
let fundebug: any = require("fundebug-javascript");
fundebug.apikey = FUNDEBUG_API_KEY;
fundebug.releasestage = IS_DEBUG ? 'development' : 'production';//应用开发阶段，development:开发;production:生产
fundebug.silent = !ENABLE_FUNDEBUG;//如果暂时不需要使用Fundebug，将silent属性设为true

export class FunDebugErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    fundebug.notifyError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{backButtonText:"",iconMode:"ios",modalEnter:"modal-slide-in",modalLeave:"modal-slide-out", tabsPlacement: 'bottom',pageTransition: 'ios','mode':'ios'}),
    IonicStorageModule.forRoot(),
    LoginModule,
    MineModule,
    DemandModule,
    MessageModule,
    HomeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeService,
    FileService,
    HttpService,
    Utils,
    Helper,
    GlobalData,
    Logger,
    AppVersion,
    Camera,
    Toast,
    Diagnostic,
    File,
    FileTransfer,
    FileOpener,
    InAppBrowser,
    AppMinimize,
    ImagePicker,
    Network,
    CodePush,
    CallNumber,
    Alipay,
    QQSDK
  ]
})
export class AppModule {}
