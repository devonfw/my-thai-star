import { UserAreaService } from '../shared/user-area.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms/forms';
import { MdDialogRef, MdSnackBar } from '@angular/material';

@Component({
  selector: 'public-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent {

  constructor(private dialog: MdDialogRef<PasswordDialogComponent>,
              private userService: UserAreaService,
              public snackBar: MdSnackBar) { }

  passwordSubmit(form: FormGroup): void {
    this.dialog.close();
    this.userService.changePassword(form).subscribe( (res: number) => {
        if (res) {
            this.snackBar.open('Password change successful', 'OK', {
                duration: 4000,
                extraClasses: ['bgc-green-500'],
            });
        } else {
            this.snackBar.open('Password change error, old password do not match', 'OK', {
                duration: 4000,
                extraClasses: ['bgc-red-600'],
            });
        }
    });
  }

}
