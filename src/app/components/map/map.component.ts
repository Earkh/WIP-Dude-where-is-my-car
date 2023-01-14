import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {GoogleMap} from '@capacitor/google-maps';
import {Position} from '@capacitor/geolocation';
import {BehaviorSubject, map, Observable, Subscription, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GeolocationService} from '../../services/geolocation.service';
import {Parking} from '../../tab2/tab2.page';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  googleMap: GoogleMap;
  parking$: Observable<Parking[]>;
  parkingSubs: Subscription;
  parking: Parking;
  currentPosition$: BehaviorSubject<Position|null>;
  currentPositionSubs: Subscription;
  currentPosition: Position|null;

  constructor(
    private geolocation: GeolocationService
  ) { }

  @ViewChild('popover') popover: any;
  isOpen = false;

  ngAfterViewInit() {
    this.parking$ = this.geolocation.getParkings();
    this.currentPosition$ = this.geolocation.getCurrentPosition();
    this.currentPositionSubs = this.currentPosition$.pipe(
      tap(position => {
        if (position) {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            timestamp: position.timestamp
          }
          this.createMap(coords).then(() => {
            this.addMarker(coords);
          });
        }
      })
    ).subscribe(position => {
      this.currentPosition = position;
    })
    this.parkingSubs = this.parking$.pipe(
      map(parking => parking[0]),
      tap(parking => {
        if (parking) {
          const coords = {
            lat: parking.lat,
            lon: parking.lon,
            timestamp: parking.timestamp,
            comment: parking.comment
          }
          this.createMap(coords).then(() => {
            this.addMarker(coords); // TODO Custom Marker for Parking
          });
        }
      })
    ).subscribe(parking => {
      this.parking = parking;
    })
  }

  async createMap(coords: Parking) {
    this.googleMap = await GoogleMap.create({
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
  }

  async addMarker(coords: Parking) {
    const marker = await this.googleMap.addMarker({
      coordinate: {
        lat: coords.lat,
        lng: coords.lon,
      }
    });

    await this.googleMap.setOnMarkerClickListener(async (marker) => {
      this.isOpen = true;
    });
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  ngOnDestroy(): void {
    this.currentPositionSubs.unsubscribe();
    this.parkingSubs.unsubscribe();
  }

}
