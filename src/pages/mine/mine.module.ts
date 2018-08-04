import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MinePage } from './mine';
import { WalletPage } from './wallet/wallet';
import { DownPage } from './down/down';
import { DownPage1 } from './down1/down';
import { DowninfoPage } from './downinfo/downinfo';
import { CasePage } from './case/case';
import { CaseinfoPage } from './caseinfo/caseinfo';
import { CollectPage } from './collect/collect';
import { GtaskPage } from './gtask/gtask';
import { GtaskPage1 } from './gtask1/gtask';
import { HelpinfoPage1 } from './helpinfo1/helpinfo';



import { GtaskinfoPage } from './gtaskinfo/gtaskinfo';
import { RolePage } from './role/role';
import { InfoPage } from './info/info';
import { SafePage } from './safe/safe';
import { UserPage } from './user/user';
import { BindemailPage } from './bindemail/bindemail';
import { RechargePage } from './recharge/recharge';
import { CashPage } from './cash/cash';
import { AboutPage } from './about/about';
import { HelpPage } from './help/help';
import { HelpinfoPage } from './helpinfo/helpinfo';
import { CertifyPage } from './certify/certify';
import { CertifyPage1 } from './certify1/certify';
import { CertifyPage2 } from './certify2/certify';
import { CertifyPage3 } from './certify3/certify';
import { UpdateinfoPage } from './updateinfo/updateinfo';
import { Wechats } from './../../providers/Wechats';

@NgModule({
  imports: [ IonicModule, ],
  declarations: [ MinePage, GtaskPage,GtaskPage1,HelpinfoPage1,CollectPage,GtaskinfoPage,RolePage,InfoPage,UpdateinfoPage,CertifyPage,CertifyPage1,CertifyPage2,CertifyPage3,WalletPage,DownPage,DownPage1,DowninfoPage,CasePage,CaseinfoPage,SafePage,UserPage,BindemailPage,RechargePage,CashPage,AboutPage,HelpPage,HelpinfoPage, ],
  entryComponents:[MinePage, GtaskPage,GtaskPage1,HelpinfoPage1,CollectPage,GtaskinfoPage,RolePage,InfoPage,UpdateinfoPage,CertifyPage,CertifyPage1,CertifyPage2,CertifyPage3,WalletPage,DownPage,DownPage1,DowninfoPage,CasePage,CaseinfoPage,SafePage,UserPage,BindemailPage,RechargePage,CashPage,AboutPage,HelpPage,HelpinfoPage, ],
  providers:[Wechats],
  exports: [IonicModule]


})
export class MineModule {}
