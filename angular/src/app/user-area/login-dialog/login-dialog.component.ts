import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import {LoginInfo} from '../../shared/backend-models/interfaces';
import * as fromStore from '../store/reducers';
import {Store} from '@ngrx/store';
import {Login} from '../store/actions/auth.actions';

@Component({
  selector: 'public-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  user: LoginInfo = new LoginInfo();

  constructor(
    private dialog: MatDialogRef<LoginDialogComponent>,
    private store: Store<fromStore.AuthState>
  ) { }

  logInSubmit(formValue: FormGroup): void {
    const credentials = {
      username: formValue['username'],
      password: formValue['password']
    };
    this.store.dispatch(new Login({credentials}));
    this.dialog.close();
}

  signInSubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }
}
