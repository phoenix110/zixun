import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { DemandinfoPage } from './demandinfo/demandinfo';
import { HotdemandPage } from './hotdemand/hotdemand';
import { SearchPage } from './search/search';

@NgModule({
  imports: [ IonicModule, ],
  declarations: [ HomePage,HotdemandPage, SearchPage,DemandinfoPage,],
  entryComponents:[HomePage,HotdemandPage, SearchPage,DemandinfoPage,],
  exports: [IonicModule]


})
export class HomeModule {}
