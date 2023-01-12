import {Component, OnDestroy, OnInit} from '@angular/core';
import {Position} from '@capacitor/geolocation';
import {Observable, Subscription} from 'rxjs';
import {GeolocationService} from '../services/geolocation.service';

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
  currentPosition$: Observable<Position|null>;
  currentPositionSubs: Subscription;
  currentPosition: Position|null;

  constructor(
    private geolocation: GeolocationService
  ) { }

  ngOnInit() {
    this.parking$ = this.geolocation.getParkings();
    this.currentPosition$ = this.geolocation.getCurrentPosition();
    this.geolocation.init();
    this.parkingSubs = this.parking$.subscribe(parking => {
      this.parking = parking[0];
    })
    this.currentPositionSubs = this.currentPosition$.subscribe(position => {
      this.currentPosition = position;
    })
  }

  async refreshLocation() {
    await this.geolocation.setCurrentPosition();
  }

  setParking() {
    // TODO
  }

  setParkingWithComments() {
    // TODO
  }

  ngOnDestroy(): void {
    this.currentPositionSubs.unsubscribe();
    this.parkingSubs.unsubscribe();
  }

  get isLoading(): boolean {
    return !this.parking && !this.currentPosition
  }
}
