import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowserPage } from './browser';
import { BrowserPopoverPage } from './browser-popover';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { Wechats } from './../../providers/Wechats';
@NgModule({
  declarations: [
    BrowserPage,BrowserPopoverPage
  ],
  imports: [
    IonicPageModule.forChild(BrowserPage),
  ],
  entryComponents: [ 
    BrowserPage,BrowserPopoverPage
  ],
  providers:[SocialSharing,Clipboard],
  bootstrap:[BrowserPopoverPage] 
})
export class BrowserPageModule {}
