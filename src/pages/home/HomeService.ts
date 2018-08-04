import { Injectable } from "@angular/core";
import { Response, Http } from "@angular/http";
import { APP_SERVE_URL } from "../../providers/Constants";
import { HttpService } from "../../providers/HttpService";
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
  constructor(public http: Http,public httpService: HttpService) {
  }
  

  getData(){
    return this.httpService.geting( 'home/index').map((res: Response) => res.json());

  }
  
  getToken(){
    
    return this.http.get( APP_SERVE_URL + 'index/token/66321c572377623b2a9c37f2abcb0a0b').map((res: Response) => res.json());

  }
  
  getNew(){
    return this.httpService.get( 'home/news').map((res: Response) => res.json());
  }

  goCateDemand( cid ){
    return this.httpService.get( 'home/news?cate='+cid).map((res: Response) => res.json());
  }
  
  getDetail( number ){
    return this.httpService.get( 'home/detail/'+number).map((res: Response) => res.json());
  }
  

}
