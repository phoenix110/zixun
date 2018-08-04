import { Storage } from '@ionic/storage';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { Response, Http } from "@angular/http";
//import { Geolocation } from '@ionic-native/geolocation';
//import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { NativeService } from "../../providers/NativeService";
import { DemandinfoPage } from './../demand/demandinfo/demandinfo';
import { UserPage } from './../mine/user/user';

//import { MapService } from "./MapService";
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// baidu map
declare var BMap; 
//
declare var BMAP_STATUS_SUCCESS;
declare var BMAP_ANIMATION_BOUNCE;

declare let baidumap_location;
//@IonicPage()
@Component({
  selector: 'page-baidumap',
  templateUrl: 'map.html',
})
export class MapPage {
 
  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  myIcon: any; 
  platform:Platform;
  lon:number;
  lat:number;
  designers: any = [];
  demands: any = [];
  http:Http;


  constructor(
    private nativeService: NativeService,
    platform:Platform,
    //private mapService: MapService,
    http: Http,
    public navCtrl: NavController,
    public atrCtrl: AlertController,
    private storage: Storage,
    ) {
    //console.log(1111);
    //this.myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(30, 30));
    this.platform=platform,
    this.http=http;
  }

  ionViewDidLoad() {
    if (this.map) return;//后面不要刷新页面
    //this.nativeService.showLoading();
    //let map =
      this.map =
      new BMap.Map(
        this.map_container.nativeElement,
        {
          enableMapClick: true,//点击拖拽
          enableScrollWheelZoom: true,//启动滚轮放大缩小，默认禁用
          enableContinuousZoom: true //连续缩放效果，默认禁用
        }
      );//创建地图实例
      /*
      let div = document.createElement("div");
      div.appendChild(document.createTextNode("放大2级"));
      // 设置样式
      div.style.cursor = "pointer";
      div.style.border = "1px solid gray";
      div.style.zIndex = "100";
      div.style.width= "100";
      div.style.backgroundColor = "red";
      this.addClickHandlerforDiv(this,div);
      this.map.getContainer().appendChild(div);
      */
    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别
    // map.addControl(new BMap.MapTypeControl());//地图类型切换
    // map.setCurrentCity("广州"); //设置当前城市
   //30.5961537677,114.3078159191
    let point = new BMap.Point(114.38, 30.52); 
    //坐标可以通过百度地图坐标拾取器获取
    //let marker = new BMap.Marker(point);

    //var label = new BMap.Label(marker.name, { offset: new BMap.Size(20, -10)});  
    //marker.setLabel(label);  

    //this.map.addOverlay(marker);

    this.map.centerAndZoom(point, 16);//设置中心和地图显示级别
    //this.getData() ; 
    this.map.addEventListener("dragging", ()=>{ //可以进行markers的动态加载
      this.dragging(this.map);
    });//仅加载当前视野的markers
 //获取当前位置

 /*
 //this.map.addControl(new BMap.NavigationControl());
 //this.map.addControl(new BMap.OverviewMapControl());
 //this.map.addControl(new BMap.ScaleControl());
  this.platform.ready().then(() => {
    baidumap_location.getCurrentPosition((result)=> {
    //console.log(JSON.stringify(result, null, 4));   
    //let that = this;   
    //console.log(result.longtitude);
    //console.log(result.latitude);
    let point = new BMap.Point(result.longitude, result.latitude);
    //new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(30, 30))
    let myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(30, 30));
    //new BMap.Marker(point, { icon: myIcon });
    let marker =  new BMap.Marker(point,{ icon: myIcon });
    this.map.addOverlay(marker);
    this.map.centerAndZoom(point, 16);
    this.lat=result.latitude;
    this.lon=result.longitude;
    //this.getData();
    }, function (error) {
      this.nativeService.showToast('百度地图获取失败!')
    },{timeout:8000})
  });

*/  
 
  //this.storage.set('name', 'Max');
  //this.nativeService.hideLoading();
  //console.log(this.storage.get('name'));
  this.storage.get('remind').then((val) => {
    //console.log(val);
    if (!val)
        this.showConfirmAlert(); 
  })
  
  }

  
  ionViewDidEnter(){
    this.getData(); //每次进入页面重新加载
  }

  getData() {
    //this.nativeService.showLoading();
    this.http.post("http://renrenyoukong.com/xyz.php", "").timeout(5000)
    .subscribe(data => {
      //console.log(123);
      //console.log(data.json());
      //this.result=JSON.parse(data['_body']).result;
      let r=JSON.parse(data['_body']).result;      
 
      //console.log(JSON.stringify(r));
      this.designers=r.user;
      this.demands=r.demand; 
      //console.log(JSON.stringify(this.designers));
      this.showOnMap(this.demands,this.designers);

    }, error => {
        //console.log(JSON.stringify(error.json()));
        this.nativeService.hideLoading();
        this.nativeService.showToast('网络错误!')
    });
  }

  showOnMap(demand:any,designer:any){
    var icon2 = new BMap.Icon("assets/img/designer.png",new BMap.Size(20,20));
    var icon1 = new BMap.Icon("assets/img/project.png",new BMap.Size(20,20));
    this.addMarkersToMap(demand,icon1,"red",1);
    this.addMarkersToMap(designer,icon2,"blue",2);
  };
/*
  getMarkers() {
    this.http.get('assets/data/markers.json')
    .map((res) => res.json())
    .subscribe(data => { 
      this.addMarkersToMap(data);
    });
  }
*/
  addMarkersToMap(markers,myicon,lbl_font_color,type_) {    
    //var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png");
    for(let marker of markers) {
      //console.log(JSON.stringify(marker));
      if (!marker.mapx && !marker.mapy) continue;//这个应该从服务端过滤掉

      //console.log(marker.mapx+":"+marker.mapy);
      if (!marker.name || marker.name===undefined) marker.name="未提供名称";
      let point = new BMap.Point(marker.mapx, marker.mapy);
      //let point = new BMap.Point(114.38, 30.52);
      let mapmarker = new BMap.Marker(point,{icon: myicon});
      /*
      var label = new BMap.Label(marker.name, {offset: new BMap.Size(20, -10)});
      label.setStyle({  
        color : lbl_font_color,  
        fontSize : "10px",  
        height : "15px",  
        margin:0,  
        padding:0,  
        border:0,  
        lineHeight : "20px"   
      });    
      mapmarker.setLabel(label);  
      */
      this.map.addOverlay(mapmarker); 
      /*
      //var content = marker.name;
      var content ="";
      if (type_==2)  {//设计师
      content +="<table>";  
      content = content + "<tr><td> 昵称："+(marker.nickname||"没名称")+"</td></tr>";  
      content = content + "<tr><td> 技术特长："+(marker.skill||"未知")+"</td></tr>"; 
      content = content + "<tr><td> 时间："+(marker.address||"未标明地址")+"</td></tr>";  
      content += "</table>";
      
      }
      else {//项目
        content +="<table>";  
        content = content + "<tr><td> 名称："+(marker.name||"没名称")+"</td></tr>";  
        content = content + "<tr><td> 竞标低价："+(marker.reward||"没名称")+"</td></tr>"; 
        content = content + "<tr><td> 截止时间："+(marker.closedate||"没名称")+"</td></tr>";  
        content = content + "<tr><td id='s"+"'"+"><a href='#'>查看详情</a></td></tr>";  
        content += "</table>";
        ////this.navCtrl.push(DemandinfoPage,{info:item});
        //(click)="itemClick(item)
        //document.addEventListener("click",this.test);
         
      }
      */
                   // 将标注添加到地图中
      //this.addClickHandler(marker.name,content,mapmarker);
      if (type_==1)
          this.addClickHandlerforDemand(this,marker.id,mapmarker);
      else this.addClickHandlerforDesigner(this,marker.id,mapmarker);
      //mapmarker.setAnimation(BMAP_ANIMATION_BOUNCE);
    }    
    
  }
  
  /*
	addClickHandler(title,content,marker){
		marker.addEventListener("click",  function(e){
      var p = e.target; 
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      var opts = {
        width : 150, 
        height: 100, 
        title : "<span style='font-size:15px;color:#FF0000;background-color:#FFFFFF'>"+title+"</span>"
    } 
      var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
      this.map.openInfoWindow(infoWindow,point); //开启信息窗口
    }
		);
  }
  */
  addClickHandlerforDemand(p_this,id,marker){  
		marker.addEventListener("click",function(e){
      //console.log(id);
      p_this.http.post("http://renrenyoukong.com/getDemand.php?id="+id, "").timeout(20000)
      .subscribe(data => {
        //console.log(123);
        //console.log(data.json());
        //this.result=JSON.parse(data['_body']).result;
        let r=JSON.parse(data['_body']);       
        //console.log(JSON.stringify(r));
        p_this.navCtrl.push(DemandinfoPage,{info:r});
   
      }, error => {
          //console.log(JSON.stringify(error.json()));
          p_this.nativeService.hideLoading();
          p_this.nativeService.showToast('网络错误!')
      }); 
    }
		);
  }
  addClickHandlerforDesigner(p_this,id,marker){
		marker.addEventListener("click",function(e){
      //console.log(id);
      p_this.http.post("http://renrenyoukong.com/getDesigner.php?id="+id, "").timeout(20000)
      .subscribe(data => {
        //console.log(123);
        //console.log(data.json());
        //this.result=JSON.parse(data['_body']).result;
        let r=JSON.parse(data['_body']);  
        //console.log(JSON.stringify(r));
        //r=JSON.parse('{"id":"21","idcode":"39180005507","introduce":"大学教授","telphone":"13349918728","skill":["项目建议书"],"experiencecount":"0","comment":0,"name":"13349918728","nickname":"13349918728","avatar":"http://www.renrenyoukong.com/avatars/2018-01-08/15154054170.png","total":0}');    
        //console.log(JSON.stringify(r));
        p_this.navCtrl.push(UserPage,{uinfo:r});
  
      }, error => {
          console.log(JSON.stringify(error.json()));
          p_this.nativeService.hideLoading();
          p_this.nativeService.showToast('网络错误!')
      }); 
    }
		);
  }
  
  addClickHandlerforDiv(p_this,div_this){
		div_this.addEventListener("click",function(e){      
      p_this.map.setZoom(p_this.map.getZoom() + 2); // 动作        
    }
		);
  }
  centerAtMap(){
    if (this.lon){
      //let point = new BMap.Point(this.lon, this.lat);
      console.log(1);
      this.map.centerAndZoom(new BMap.Point(this.lon, this.lat), 16);
    }
  }

  showConfirmAlert() {
    let alertConfirm = this.atrCtrl.create({
      title: '信息提醒',
      message: '可以点击地图上的设计师/环保项目，查看详细信息',
      buttons: [
        {
          text: '关闭',
          role: 'cancel',
          handler: () => {
            //console.log('No clicked');
          }
        },
        {
          text: '不再提醒',
          handler: () => { 
            this.storage.set('remind',"yes");
            //console.log('Yes clicked');
          }
        }
      ]
    });
    alertConfirm.present();
  }

  dragging(map){//暂时不用
    //console.log(map); 
    //let bound=map.getBounds();//地图可视区域
    //console.log(bound);
    //if(bound.containsPoint(point)==true){
    //    alert("在可视区域内")
    //}
    //var offsetPoint = new BMap.Pixel(evt.offsetX, evt.offsetY);   //记录鼠标当前点坐标<br>   alert(offsetPoint.x+","+offsetPointY);
  }
}