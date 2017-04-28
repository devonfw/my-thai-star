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
  screenSize: string;

  constructor(public dialog: MdDialog) {}

  showBookTableDialog(form: any): void {
    window.innerWidth > 800 ? this.screenSize = '40%' : this.screenSize = '90%';
    this.dialog.open(BookTableDialogComponent, {
      width: this.screenSize,
      data: form
    });
  }

  showInviteDialog(form): void {
    window.innerWidth > 800 ? this.screenSize = '40%' : this.screenSize = '90%';
    this.dialog.open(InvitationDialogComponent, {
      width: this.screenSize,
      data: form
    });
  }

}
