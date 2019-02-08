import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

/* @export
 * @class LoginDialogComponent
 */
@Component({
  selector: 'public-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  /* Creates an instance of LoginDialogComponent.
   * @param {MatDialogRef<LoginDialogComponent>} dialog
   * @memberof LoginDialogComponent
   */
  constructor(private dialog: MatDialogRef<LoginDialogComponent>) {}

  /* @param {FormGroup} formValue
   * @memberof LoginDialogComponent
   */
  logInSubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }

  /* @param {FormGroup} formValue
   * @memberof LoginDialogComponent
   */
  signInSubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }
}
