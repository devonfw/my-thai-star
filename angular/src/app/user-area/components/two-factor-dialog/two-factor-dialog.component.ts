import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-two-factor-dialog',
  templateUrl: './two-factor-dialog.component.html',
  styleUrls: ['./two-factor-dialog.component.scss']
})
export class TwoFactorDialogComponent {

  constructor(private dialog: MatDialogRef<TwoFactorDialogComponent>) { }

  verifySubmit(formValue: FormGroup): void {
    this.dialog.close(formValue);
  }
}
