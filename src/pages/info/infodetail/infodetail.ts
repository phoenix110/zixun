import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

/**
 * Generated class for the InfodetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infodetail',
  templateUrl: 'infodetail.html',
})
export class InfodetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private themeableBrowser: ThemeableBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfodetailPage');
    this.openBrowser();
  }

  openBrowser() {
    // https://ionicframework.com/docs/native/themeable-browser/
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: '#3573bbff'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true,
        staticText: '详细信息'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        wwwImage: 'assets/img/close_icon.png',
        align: 'left',
        event: 'closePressed'
      },
    };
 
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('http://www.renrenyoukong.com', '_self', options);
 
    browser.on('closePressed').subscribe(data => {
      browser.close();
    })
  }
}
