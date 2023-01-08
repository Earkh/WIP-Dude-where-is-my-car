import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface IError {
  code: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _currentError$ = new BehaviorSubject<IError | any>(null);

  constructor() {
  }

  setCurrentError(err: IError) {
    this._currentError$.next(err);
  }

  getCurrentError$(): Observable<IError> {
    return this._currentError$.asObservable();
  }
}
