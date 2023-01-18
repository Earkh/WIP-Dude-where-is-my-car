import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {Position} from '@capacitor/geolocation';
import {BehaviorSubject, map, Observable, Subscription, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GeolocationService} from '../../services/geolocation.service';
import {Parking} from '../../tab2/tab2.page';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  style = `mapbox://styles/mapbox/streets-v12`;
  parking$: Observable<Parking[]>;
  parkingSubs: Subscription;
  parking: Parking;
  currentPosition$: BehaviorSubject<Position|null>;
  currentPositionSubs: Subscription;
  currentPosition: Position|null;
  zoom = 15;

  constructor(
    private geolocation: GeolocationService
  ) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

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
          this.map.setCenter(coords)
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
          this.createMap(coords);
        }
      })
    ).subscribe(parking => {
      this.parking = parking;
    })
  }

  presentPopover() {
    this.isOpen = true;
  }

  ngOnDestroy(): void {
    this.currentPositionSubs.unsubscribe();
    this.parkingSubs.unsubscribe();
  }

  createMap(coords: Parking) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [coords.lon, coords.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl({showCompass: true, showZoom: true, visualizePitch: true}), 'top-right');
    this.marker = new mapboxgl.Marker()
      .setLngLat([coords.lon, coords.lat])
      .addTo(this.map);
    this.marker.getElement().addEventListener('click', () => {
      this.presentPopover();
    })

  }

}
