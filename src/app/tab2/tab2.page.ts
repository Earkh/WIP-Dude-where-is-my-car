import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Position} from '@capacitor/geolocation';
import {BehaviorSubject, map, Observable, Subscription, tap} from 'rxjs';
import {GeolocationService} from '../services/geolocation.service';
import {SetParkingModalComponent} from '../components/set-parking-modal/set-parking-modal.component';

export interface Parking {
  lat: number,
  lon: number,
  timestamp: number,
  comment?: string
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  parking$: Observable<Parking[]>;
  parkingSubs: Subscription;
  parking: Parking;
  currentPosition$: BehaviorSubject<Position|null>;
  currentPositionSubs: Subscription;
  currentPosition: Position|null;

  constructor(
    private geolocation: GeolocationService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.parking$ = this.geolocation.getParkings();
    this.currentPosition$ = this.geolocation.getCurrentPosition();
    this.parkingSubs = this.parking$.pipe(
      map(response => response[0]),
      tap(parking => {
        if(!parking) {
          this.geolocation.initCurrentPosition();
        }
      })
    ).subscribe(parking => {
      this.parking = parking;
    })
    this.currentPositionSubs = this.currentPosition$.subscribe(position => {
      this.currentPosition = position;
    })
  }

  async refreshLocation() {
    await this.geolocation.setCurrentPosition();
  }

  async presentSetParkingModal() {
    const modal = await this.modalCtrl.create({
      component: SetParkingModalComponent,
      cssClass: 'setParkingModal',
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    this.currentPositionSubs.unsubscribe();
    this.parkingSubs.unsubscribe();
  }

  get isLoading(): boolean {
    return !this.parking && !this.currentPosition
  }
}
