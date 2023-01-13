import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {Position} from '@capacitor/geolocation';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GeolocationService} from '../../services/geolocation.service';

@Component({
  selector: 'app-set-parking-modal',
  templateUrl: './set-parking-modal.component.html',
  styleUrls: ['./set-parking-modal.component.scss'],
})
export class SetParkingModalComponent implements OnInit, OnDestroy {

  parkingForm: FormGroup;
  currentPosition$: BehaviorSubject<Position|null>;
  currentPositionSubs: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private geolocation: GeolocationService,
    private modalCtrl: ModalController
  ) {
    this.parkingForm = this.formBuilder.group({
      lat: [],
      lon: [],
      timestamp: [],
      comment: ['', Validators.maxLength(80)]
    })
  }

  ngOnInit() {
    this.currentPosition$ = this.geolocation.getCurrentPosition();
    this.currentPositionSubs = this.currentPosition$.subscribe(position => {
      this.parkingForm.patchValue({
        lat: position?.coords.latitude,
        lon: position?.coords.longitude,
        timestamp: position?.timestamp
      })
    })

  }

  setParking() {
    this.geolocation.setParking(this.parkingForm.value);
    this.modalCtrl.dismiss();
  }

  closeWithoutChanges() {
    this.modalCtrl.dismiss();
  }
  ngOnDestroy() {
    this.currentPositionSubs.unsubscribe();
  }

}
