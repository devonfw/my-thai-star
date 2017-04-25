import { TdDialogService } from '@covalent/core/dialogs/services/dialog.service';
import { ComponentType, MdDialog } from '@angular/material';
import { Component, ViewContainerRef } from '@angular/core';
import _ from 'lodash';
import { BookTableDialogComponent } from './book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})

export class BookTableComponent {

  invitationModel: string[] = [];

  constructor(public dialog: MdDialog) {}

  showBookTableDialog(form: any): void {
    this.dialog.open(BookTableDialogComponent, {
      width: '40%',
      data: form
    });
  }

  showInviteDialog(form): void {
    this.dialog.open(InvitationDialogComponent, {
      width: '40%',
      data: form
    });
  }

}
