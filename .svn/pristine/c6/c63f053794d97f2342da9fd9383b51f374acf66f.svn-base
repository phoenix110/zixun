import { Injectable } from "@angular/core";
import { Response, Http, URLSearchParams } from "@angular/http";
import { Utils } from "../../providers/Utils";
import 'rxjs/add/operator/map';
import { HttpService } from "../../providers/HttpService";

@Injectable()
export class DemandService {

  constructor(public http: Http,public httpService: HttpService) {
  }
  
  getHot(){
    return this.httpService.get('demand/index?order=2&pagesize=2').map((res: Response) => res.json());
  }

  getList(order){

    let params = DemandService.buildURLSearchParams(order).toString();
    return this.httpService.get('demand/index?'+params).map((res: Response) => res.json());
  }

  getListing(order){

    //let params = DemandService.buildURLSearchParams(order).toString();
    return this.httpService.geting('demand/index',order).map((res: Response) => res.json());
  }

  sendcode(url){
    return this.httpService.get(url).map((res: Response) => res.json());
  }

  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      }
      params.set(key, val);
    }
    return params;
  }
  

  getList2(order){
    let params = DemandService.buildURLSearchParams(order).toString();
    return this.httpService.get('demand/index?'+params).map((res: Response) => res.json());

  }
  
  getNews(){
    return this.httpService.get('home/news').map((res: Response) => res.json());
  }

  goCateDemand( cid ){
    if(cid>0){
      return this.httpService.get('demand/cate?cate='+cid).map((res: Response) => res.json());
    }else{
      return this.httpService.get('demand/cate?cate=0').map((res: Response) => res.json());

    }
   
  }

  downfileforDemand( number ){
      return this.httpService.get( 'demand/downfiles/'+number).map((res: Response) => res.json());
  }

  //获取设计阶段
  getDesignphase( pid ){
    if(pid>0){
      return this.httpService.get('demand/designphase?pid='+pid).map((res: Response) => res.json());
    
    }else{
      return this.httpService.get( 'demand/designphase?pid=0').map((res: Response) => res.json());

    }
   
  }
  
  getDetail( number ){
      return this.httpService.get( 'home/detail/'+number).map((res: Response) => res.json());
  }
  
  addpipei( data ){
    return this.httpService.post(  'demand/adddesign',data).map((res: Response) => res.json());
  }


  //竞标
  doOffer( number ){
    return this.httpService.get(  'demand/dooffer?number='+ number ).map((res: Response) => res.json());
  }
  //收藏
  doCollect( number ){
    return this.httpService.get(  'demand/collect/'+ number ).map((res: Response) => res.json());
  }

  // 支付保证金页面
  paypage( number ){
    return this.httpService.geting(  'user/readypay/'+ number ).map((res: Response) => res.json());
  }

  pay(number,payway,paypassword){
    return this.httpService.get(  'demand/pay?number='+ number+'&payway='+payway+'&paypassword='+paypassword ).map((res: Response) => res.json());
  }

}
