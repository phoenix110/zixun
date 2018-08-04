import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {LoginPage} from './login';
import {RegisterPage} from './register/register';
import { Wechats } from "../../providers/Wechats";

@NgModule({
  imports: [IonicModule],
  declarations: [LoginPage, RegisterPage,],
  entryComponents: [LoginPage, RegisterPage,],
  exports: [IonicModule],
  providers:[Wechats]
})
export class LoginModule {
}
