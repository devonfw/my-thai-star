import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import {Store} from '@ngrx/store';
import {Login} from '../../store/actions/auth.actions';
import {Credentials} from '../../models/user';
import * as fromApp from 'app/store/reducers';

@Component({
  selector: 'public-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  constructor(
    private dialog: MatDialogRef<LoginDialogComponent>,
    private store: Store<fromApp.AppState>
  ) {}

  onLoginSubmit(credentials: Credentials): void {
    this.store.dispatch(new Login({credentials}));
  }

  onSignInSubmit(formValue: FormGroup): void {
  }
}
