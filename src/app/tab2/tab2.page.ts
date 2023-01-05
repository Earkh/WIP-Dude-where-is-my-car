import {Component, OnInit} from '@angular/core';
import {GeolocationService} from '../services/geolocation.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  isLocationLoaded: boolean = false;

  constructor(
    private geolocation: GeolocationService
  ) {
    this.geolocation.setCurrentPosition();
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition$().subscribe(position => {
        position
          ? this.isLocationLoaded = true
          : this.isLocationLoaded = false
      }
    );
  }

}
