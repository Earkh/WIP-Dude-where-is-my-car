import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from '@capacitor/google-maps';
import {Position} from '@capacitor/geolocation';
import {Observable, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GeolocationService} from '../../services/geolocation.service';
import {Parking} from '../../tab2/tab2.page';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
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
    this.parkingSubs = this.parking$.subscribe(parking => {
      this.parking = parking[0];
      this.createMap(this.parking);
    })
    this.currentPositionSubs = this.currentPosition$.subscribe(position => {
      this.currentPosition = position;
      if (this.currentPosition && !this.parking) {
        this.createMap({
          lat: this.currentPosition!.coords.latitude,
          lon: this.currentPosition!.coords.longitude,
          timestamp: this.currentPosition!.timestamp
        });
      }
    })
  }

  async createMap(coords: Parking) {
    this.newMap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleMapsApiKey,
      forceCreate: true,
      config: {
        center: {
          lat: coords.lat,
          lng: coords.lon,
        },
        zoom: 16,
      },
    });

    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: coords.lat,
        lng: coords.lon,
      }
    });
  }

  ngOnDestroy(): void {
    this.currentPositionSubs.unsubscribe();
    this.parkingSubs.unsubscribe();
  }

}
