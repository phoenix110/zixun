import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MessagePage } from './message';
import { MsginfoPage } from './msginfo/msginfo';

@NgModule({
  imports: [ IonicModule, ],
  declarations: [ MessagePage,MsginfoPage, ],
  entryComponents:[MessagePage,MsginfoPage, ],
  exports: [IonicModule]


})

export class MessageModule {}
