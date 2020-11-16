import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-public-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  constructor(private dialog: MatDialogRef<LoginDialogComponent>) {}

  logInSubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }

  signInSubmit(formValue: FormGroup): void {
    // Since there is no backend implementation for the signup below code is used to close dialog box after submission.
    // Once the implementationis done uncomment the below code and remove the existing one.
    // this.dialog.close(formValue);
    this.dialog.close();
  }

  closeLoginDialog(): void {
    this.dialog.close();
  }
}
