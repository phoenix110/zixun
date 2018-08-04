import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DemandPage } from './demand';
import { DemandinfoPage } from './demandinfo/demandinfo';
import { PayPage } from './pay/pay';

@NgModule({
  imports: [ IonicModule, ],
  declarations: [ DemandPage,DemandinfoPage,PayPage, ],
  entryComponents:[DemandPage,DemandinfoPage,PayPage, ],
  exports: [IonicModule]


})
export class DemandModule {}
