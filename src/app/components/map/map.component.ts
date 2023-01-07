import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GoogleMap} from '@capacitor/google-maps';
import {Position} from '@capacitor/geolocation';
import {environment} from '../../../environments/environment';
import {GeolocationService} from '../../services/geolocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  constructor(
    private geolocation: GeolocationService
  ) { }

  ngAfterViewInit() {
    this.geolocation.getCurrentPosition$().subscribe(position => {
      this.createMap(position);
    });
  }

  async createMap(coords: Position) {
    this.newMap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleMapsApiKey,
      forceCreate: true,
      config: {
        center: {
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        },
        zoom: 8,
      },
    });

    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: coords.coords.latitude,
        lng: coords.coords.longitude,
      }
    });
  }

}
