import {Injectable} from '@angular/core';
import {Geolocation, Position} from '@capacitor/geolocation';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private currentPosition: Position | any;
  private _currentPosition$ = new BehaviorSubject<Position | any>(null);

  constructor(
    private error: ErrorService
  ) {
  }

  async setCurrentPosition() {
    try {
      this.currentPosition = await Geolocation.getCurrentPosition();
      this._currentPosition$.next(this.currentPosition);
    } catch (e: any) {
      this._currentPosition$.next(e);
      this.error.setCurrentError(e);
    }
  };

  getCurrentPosition$(): Observable<any> {
    return this._currentPosition$.asObservable();
  }
}
