import { Component } from '@angular/core';
import { MineService } from "../MineService";
import {NativeService} from "../../../providers/NativeService";
import {ViewController} from 'ionic-angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-role',
  templateUrl: 'role.html',
  providers: [MineService]
})
export class RolePage {

  constructor(
        public storage: Storage,
        private nativeService: NativeService,
        private viewCtrl: ViewController,
    private mineService: MineService
  ) {
    
  };

  doType(type){
    let uid = 0;
    this.storage.get('UserInfo').then(user => {
      if( user.id ){
        uid = user.id;
      }
    });

   

  	this.mineService.setRole(type,uid).subscribe(res => {
        if(res.code == 0 ){
          this.storage.set('UserInfo',res.value);
          this.viewCtrl.dismiss(res.value);
        }else{
          this.nativeService.showToast(res.message);
          
        }
      
      }, () => {
        
      });
  }

}
