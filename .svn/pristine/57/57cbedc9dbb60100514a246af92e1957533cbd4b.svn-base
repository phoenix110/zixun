import { Injectable } from "@angular/core";
import { Response, Http } from "@angular/http";
import { HttpService } from "../../providers/HttpService";
import 'rxjs/add/operator/map';
@Injectable()
export class MessageService {
  constructor(public http: Http,public httpService: HttpService) {
  }
  

  getData( param ){
    return this.httpService.get( 'user/notice?'+param).map((res: Response) => res.json());

  }
 
  
  getDetail( id ){
    return this.httpService.get( 'user/noticedetail/'+id).map((res: Response) => res.json());
  }
  
  delData(id){
    return this.httpService.get( 'user/noticedel/'+id).map((res: Response) => res.json());
  }

}
