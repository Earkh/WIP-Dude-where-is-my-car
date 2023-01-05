import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {LoadingScreenComponent} from './loading-screen.component';


@NgModule({
  declarations: [
    LoadingScreenComponent
  ],
  exports: [
    LoadingScreenComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class LoadingScreenModule {
}
