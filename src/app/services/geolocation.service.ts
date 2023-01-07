import {Injectable} from '@angular/core';
import {Geolocation, Position} from '@capacitor/geolocation';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private currentPosition: Position | any;
  private _currentPosition$ = new BehaviorSubject<Position | any>(null);

  constructor() {
  }

  async setCurrentPosition() {
    try {
      this.currentPosition = await Geolocation.getCurrentPosition();
      this._currentPosition$.next(this.currentPosition);
    } catch (e) {
      console.error(e);
      this._currentPosition$.next(e);
    }
  };

  getCurrentPosition$(): Observable<any> {
    return this._currentPosition$.asObservable();
  }
}
