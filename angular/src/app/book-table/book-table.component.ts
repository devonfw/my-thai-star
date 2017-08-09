import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BookTableDialogComponent } from './book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { WindowService } from '../core/windowService/windowService.service';
import { SnackBarService } from '../core/snackService/snackService.service';
import { emailValidator } from '../shared/directives/email-validator.directive';
import { last } from 'lodash';

@Component({
  selector: 'public-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
})

export class BookTableComponent {

  private invitationModel: string[] = [];
  private minDate: Date = new Date();

  constructor(public window: WindowService,
              public snackBarservice: SnackBarService,
              public dialog: MdDialog) {
  }

  showBookTableDialog(form: FormGroup): void {
    let dialogRef: MdDialogRef<BookTableDialogComponent> = this.dialog.open(BookTableDialogComponent, {
      width: this.window.responsiveWidth(),
      data: form.value,
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        form.reset();
      }
    });
  }

  showInviteDialog(form: FormGroup): void {
    let dialogRef: MdDialogRef<InvitationDialogComponent> = this.dialog.open(InvitationDialogComponent, {
      width: this.window.responsiveWidth(),
      data: form.value,
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        form.reset();
        this.invitationModel = [];
      }
    });
  }

  validateEmail(): void {
    if (!emailValidator(last(this.invitationModel))) {
      this.invitationModel.pop();
      this.snackBarservice.openSnack('Email format not valid', 1000, 'red');
    }
  }

}
