import {Injectable} from '@angular/core';
import {Geolocation, Position} from '@capacitor/geolocation';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private currentPosition: Position | any;
  private _currentPosition$ = new BehaviorSubject<Position | null>(null);

  constructor() {
  }

  async setCurrentPosition() {
    this.currentPosition = await Geolocation.getCurrentPosition();
    this._currentPosition$.next(this.currentPosition);
  };

  getCurrentPosition$(): Observable<any> {
    return this._currentPosition$.asObservable();
  }
}
