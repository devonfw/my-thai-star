import { FormGroup } from '@angular/forms';
import { ComponentType, MdDialog, MdDialogRef } from '@angular/material';
import { Component, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs/services/dialog.service';
import { BookTableDialogComponent } from './book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { WindowService } from '../shared/windowService/windowService.service';
import _ from 'lodash';

@Component({
  selector: 'public-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
})

export class BookTableComponent {

  invitationModel: string[] = [];

  constructor(public window: WindowService, public dialog: MdDialog) {
  }

  showBookTableDialog(form: FormGroup): void {
    let dialogRef: MdDialogRef<BookTableDialogComponent> = this.dialog.open(BookTableDialogComponent, {
      width: this.window.responsiveWidth(),
      data: form.value,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        form.reset();
      }
    });
  }

  showInviteDialog(form: FormGroup): void {
    let dialogRef: MdDialogRef<InvitationDialogComponent> = this.dialog.open(InvitationDialogComponent, {
      width: this.window.responsiveWidth(),
      data: form.value,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        form.reset();
      }
    });
  }

}
