import {Component, OnInit} from '@angular/core';
import {ErrorService, IError} from '../../services/error.service';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.scss'],
})
export class ErrorScreenComponent implements OnInit {

  private _error: IError;

  constructor(
    private errorService: ErrorService
  ) {
  }

  ngOnInit() {
    this.errorService.getCurrentError$().subscribe(err => {
      this._error = err;
    });
  }

  get error(): IError {
    return this._error;
  }
}
