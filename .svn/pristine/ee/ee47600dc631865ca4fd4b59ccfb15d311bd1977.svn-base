import { Injectable } from "@angular/core";
import { Response, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { HttpService } from "../../providers/HttpService";

@Injectable()
export class LoginService {
  constructor(public http: Http,public httpService: HttpService) {
  }
  

  getUserinfo(){
    return this.httpService.get( 'user/index').map((res: Response) => res.json());
  }
  
  login(user) {
    
    if(user.flag=="1"){
      let param = {
        flag:1,
        phone: user.phone,
        password: user.password
      };
      return this.httpService.post('login/index',param).map((res: Response) => res.json());

    }else{
      let param = {
        flag:2,
        phone: user.phone,
        yzm: user.verificationCode
      };
      return this.httpService.post('login/index',param).map((res: Response) => res.json());
      
    }
     
  }
  

  register(user) {
    let param = {
     'phone': user.phone,
     'yzm': user.verificationCode,
     'password2': user.password,
     'password': user.password
     };
      return this.httpService.post( 'login/register',param).map((res: Response) => res.json());
  }
  
  sendcode(url){
      return this.httpService.get( url ).map((res: Response) => res.json());
  }
  

}
