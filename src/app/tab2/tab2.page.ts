import {Component, OnInit} from '@angular/core';
import {GeolocationService} from '../services/geolocation.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  responseIs: string = 'loading';

  constructor(
    private geolocation: GeolocationService
  ) {
    this.geolocation.setCurrentPosition();
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition$().subscribe(position => {
        !position
          ? this.responseIs = 'loading'
          : position.coords
            ? this.responseIs = 'map'
            : this.responseIs = 'error'
      }
    );
  }

}
