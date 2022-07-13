import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-public-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  showCredentials = false;
  
  constructor(private dialog: MatDialogRef<LoginDialogComponent>) {}

  logInSubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }

  signInSubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }

  closeLoginDialog(): void {
    this.dialog.close();
  }
}
