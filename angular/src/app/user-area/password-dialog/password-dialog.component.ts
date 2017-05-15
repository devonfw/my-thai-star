import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'public-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent {

  constructor(private dialog: MdDialogRef<PasswordDialogComponent>) { }

  passwordSubmit(form: FormGroup): void {
    // algo
  }

}
