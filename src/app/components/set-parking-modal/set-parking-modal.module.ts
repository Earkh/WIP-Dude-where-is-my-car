import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SetParkingModalComponent } from './set-parking-modal.component';



@NgModule({
  declarations: [
    SetParkingModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    SetParkingModalComponent
  ]
})
export class SetParkingModalModule { }
