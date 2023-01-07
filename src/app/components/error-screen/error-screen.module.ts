import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorScreenComponent} from './error-screen.component';


@NgModule({
  declarations: [ErrorScreenComponent],
  exports: [
    ErrorScreenComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ErrorScreenModule {
}
