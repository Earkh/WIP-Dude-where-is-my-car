import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {Tab2PageRoutingModule} from './tab2-routing.module';
import {MapModule} from '../components/map/map.module';
import {LoadingScreenModule} from '../components/loading-screen/loading-screen.module';
import {ErrorScreenModule} from '../components/error-screen/error-screen.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingScreenModule,
    MapModule,
    Tab2PageRoutingModule,
    ErrorScreenModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {
}
