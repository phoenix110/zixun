import { BrowserModule } from '@angular/platform-browser';
import { BrowserPageModule } from '../browser/browser.module';
import { InfodetailPageModule } from './infodetail/infodetail.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';  
import { InfoPage } from './info';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
 
import {HttpModule} from '@angular/http';
@NgModule({
  declarations: [ 
    InfoPage 
  ],
  imports: [HttpModule,BrowserModule, BrowserPageModule, 
    IonicPageModule.forChild(InfoPage),
  ],
  providers:[ThemeableBrowser/*MapService*/],

})
export class InfoPageModule {}
