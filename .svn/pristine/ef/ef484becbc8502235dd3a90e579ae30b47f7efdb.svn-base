import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { MineService } from "../MineService";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [MineService]

})
export class AboutPage {
	info : any = {};
  constructor(
    private mineService: MineService,
    private viewCtrl: ViewController
  ) {
    
  };

  ionViewDidLoad(){
    //当页面进入初始化的时候
    let elements = document.querySelectorAll(".tabbar");
    if(elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display ='none';
        });
    } 

  	this.getAbout();
  }

  back(){
  	this.viewCtrl.dismiss();
  }
  
  getAbout(){
    this.info = {
      title:"关于我们",
      content:"<p>有空吗网由武汉人人有空信息科技有限公司于2017年创建，是环保设计领域的电子商务交易平台，交易品类涵盖环保工程项目的各个环节，包括环境影响评价、清洁生产审核、项目建议书、可行性研究、初步设计、施工图设计等。</p><p>有空吗网是环保领域专业人才的碎片化时间变现专家。平台的在线服务商可为企业、公共机构和个人提供定制化的解决方案，同时服务商足不出户即可在平台上承接自己喜欢或擅长的工作，将创意、智慧、技能转化为商业价值和社会价值，实现碎片时间向价值的转变。</p>"
    }
  	this.mineService.getAbout().subscribe(res=>{
		if(res.code==0){
			//this.info = res.value;
		}
	});
  }

  //当退出页面的时候
  ionViewWillLeave() {
      let elements = document.querySelectorAll(".tabbar");
      if(elements != null) {
          Object.keys(elements).map((key) => {
              elements[key].style.display ='flex';
          });
      }
  }   

}