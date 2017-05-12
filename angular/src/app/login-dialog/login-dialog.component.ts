import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms/forms';

@Component({
  selector: 'public-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {

  constructor(private dialog: MdDialogRef<LoginDialogComponent>) { }

  logInSubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }

  signInSubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }

  forgotPassword(): void {
    // implement forgot password
  }

}
