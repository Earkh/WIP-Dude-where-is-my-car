import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';
import {GeolocationService} from './geolocation.service';
import {Parking} from '../tab2/tab2.page';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _isPopoverOpen$;
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  style = `mapbox://styles/mapbox/streets-v12`;
  zoom = 15;

  constructor(
    private geolocation: GeolocationService
  ) {
    this.mapbox.accessToken = environment.mapBoxToken;
    this._isPopoverOpen$ = new BehaviorSubject<boolean>(false);
  }

  createMap(coords: Parking): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [coords.lon, coords.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'top-right');
    this.marker = new mapboxgl.Marker()
      .setLngLat([coords.lon, coords.lat])
      .addTo(this.map);
    this.marker.getElement().addEventListener('click', () => {
      this.togglePopover();
    })
  }

  centerMap(coords: Parking): void {
    this.map.setCenter(coords)
  }

  navigateToCar(coords: Parking): void {
    this.map.setCenter(coords)
    this.geolocation.resetCurrentPosition();
  }

  togglePopover(): void {
    this._isPopoverOpen$.next(!this._isPopoverOpen$.value);
  }

  public getIsPopoverOpen(): BehaviorSubject<boolean> {
    return this._isPopoverOpen$;
  }

}
