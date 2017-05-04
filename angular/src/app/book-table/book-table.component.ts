import { ComponentType, MdDialog } from '@angular/material';
import { Component, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs/services/dialog.service';
import { BookTableDialogComponent } from './book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { WindowService } from '../shared/windowService/windowService.service';
import _ from 'lodash';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})

export class BookTableComponent {

  invitationModel: string[] = [];
  screenSize: string;
  _window: Window;

  constructor(public window: WindowService, public dialog: MdDialog) {
    this._window = window.nativeWindow;
  }

  showBookTableDialog(form: any): void {
    this._window.innerWidth > 800 ? this.screenSize = '40%' : this.screenSize = '90%';
    let dialogRef = this.dialog.open(BookTableDialogComponent, {
      width: this.screenSize,
      data: form.value
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        form.reset();
      }
    });
  }

  showInviteDialog(form): void {
    this._window.innerWidth > 800 ? this.screenSize = '40%' : this.screenSize = '90%';
    let dialogRef = this.dialog.open(InvitationDialogComponent, {
      width: this.screenSize,
      data: form.value
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        form.reset();
      }
    });
  }

}
