import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
//import { MapService } from "./MapService";
//import {HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [//HttpModule,
    IonicPageModule.forChild(MapPage),
  ],
  providers:[/*MapService*/]
})
export class MapPageModule {
  
}
