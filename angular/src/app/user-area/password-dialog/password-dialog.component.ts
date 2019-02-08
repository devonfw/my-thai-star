import { UserAreaService } from '../shared/user-area.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms/forms';
import { MatDialogRef } from '@angular/material';

/* @export
 * @class PasswordDialogComponent
 */
@Component({
  selector: 'public-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent {
  /* Creates an instance of PasswordDialogComponent.
   * @param {MatDialogRef<PasswordDialogComponent>} dialog
   * @param {UserAreaService} userService
   * @memberof PasswordDialogComponent
   */
  constructor(
    private dialog: MatDialogRef<PasswordDialogComponent>,
    private userService: UserAreaService,
  ) {}

  /* @param {FormGroup} form
   * @memberof PasswordDialogComponent
   */
  passwordSubmit(form: FormGroup): void {
    this.dialog.close();
    this.userService.changePassword(form);
  }
}
