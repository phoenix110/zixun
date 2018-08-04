import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";

@Component({
  template: ` 
  <div class="share">
    <a href="#" (click)="shareQQ()" class="qq">QQ分享</a>
    <a href="#" (click)="wxLogin()" class="weixin">BB</a>
    <a href="#" (click)="sinaLogin()" class="sina">CC</a>
  </div> 
  `
})
export class BrowserPopoverPage {
  parentCallback: {refresh: () => void, share?: () => void, close: () => void};

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {
    this.parentCallback = this.navParams.data.callback;
  }

  // 刷新
  refresh() { 
    //this.parentCallback.refresh();
    //this.viewCtrl.dismiss();
  }

  // 分享
  share() {
    //this.parentCallback.share();
    //this.viewCtrl.dismiss();
  }

  close() {
    //this.viewCtrl.dismiss();
    //this.parentCallback.close();
  }
  changeFontFamily(){}
}