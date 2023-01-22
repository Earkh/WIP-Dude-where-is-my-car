import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LaunchNavigator} from "@awesome-cordova-plugins/launch-navigator/ngx";
import {Tab2Page} from './tab2.page';
import {Tab2PageRoutingModule} from './tab2-routing.module';
import {MapModule} from '../components/map/map.module';
import {LoadingScreenModule} from '../components/loading-screen/loading-screen.module';
import {SetParkingModalModule} from '../components/set-parking-modal/set-parking-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingScreenModule,
    MapModule,
    SetParkingModalModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page],
  providers: [LaunchNavigator]
})
export class Tab2PageModule {
}
