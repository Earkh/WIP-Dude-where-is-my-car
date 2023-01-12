import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {Geolocation, Position} from '@capacitor/geolocation';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorService} from './error.service';
import {Parking} from '../tab2/tab2.page';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private _currentPosition$;
  parkingCollection: AngularFirestoreCollection<Parking>;
  parking$: Observable<Parking[]>;

  constructor(
    private error: ErrorService,
    private firestore: AngularFirestore
  ) {
    this._currentPosition$ = new BehaviorSubject<Position|null>(null);
    this.parkingCollection = firestore.collection<Parking>('parkings');
    this.parking$ = this.parkingCollection.valueChanges();
  }

  public async init() {
    const position: Position = await Geolocation.getCurrentPosition();
    this._currentPosition$.next(position);
  }

  public getParkings(): Observable<Parking[]> {
    return this.parking$;
  }

  public getCurrentPosition(): Observable<Position|null> {
    return this._currentPosition$;
  }

  async setCurrentPosition() {
    try {
      this._currentPosition$.next(await Geolocation.getCurrentPosition());
    } catch (e: any) {
      this.error.setCurrentError(e);
    }
  };

}
