import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Position} from '@capacitor/geolocation';
import {BehaviorSubject, map, Observable, Subscription, tap} from 'rxjs';
import {MapService} from '../../services/map.service';
import {GeolocationService} from '../../services/geolocation.service';
import {Parking} from '../../tab2/tab2.page';
import {LaunchNavigator, LaunchNavigatorOptions} from '@awesome-cordova-plugins/launch-navigator/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @ViewChild('popover') popover: ElementRef<HTMLCanvasElement>;
  isPopoverOpen$: BehaviorSubject<boolean>;
  parking$: Observable<Parking[]>;
  parkingSubs: Subscription;
  parking: Parking;
  currentPosition$: BehaviorSubject<Position | null>;
  currentPositionSubs: Subscription;
  currentPosition: Position | null;

  constructor(
    private geolocation: GeolocationService,
    private mapService: MapService,
    private launchNavigator: LaunchNavigator
  ) { }

  ngAfterViewInit(): void {
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
          this.mapService.centerMap(coords)
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
          this.mapService.createMap(coords);
        }
      })
    ).subscribe(parking => {
      this.parking = parking;
    })
    this.isPopoverOpen$ = this.mapService.getIsPopoverOpen();
  }

  createMap(coords: Parking): void {
    this.mapService.createMap(coords);
  }

  centerMap(coords: Parking): void {
    this.mapService.centerMap(coords)
  }

  togglePopover(): void {
    this.mapService.togglePopover()
  }

  howToReach() {
    this.launchNavigator.navigate([this.parking.lat, this.parking.lon]);
  }

  ngOnDestroy(): void {
    this.currentPositionSubs.unsubscribe();
    this.parkingSubs.unsubscribe();
  }

}
