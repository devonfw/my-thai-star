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
  screenSize: string;
  _window: Window;

  constructor(public window: WindowService, public dialog: MdDialog) {
    this._window = window.nativeWindow;
  }

  showBookTableDialog(form: FormGroup): void {
    this._window.innerWidth > 800 ? this.screenSize = '40%' : this.screenSize = '80%';
    let dialogRef: MdDialogRef<BookTableDialogComponent> = this.dialog.open(BookTableDialogComponent, {
      width: this.screenSize,
      data: form.value,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        form.reset();
      }
    });
  }

  showInviteDialog(form: FormGroup): void {
    this._window.innerWidth > 800 ? this.screenSize = '40%' : this.screenSize = '80%';
    let dialogRef: MdDialogRef<InvitationDialogComponent> = this.dialog.open(InvitationDialogComponent, {
      width: this.screenSize,
      data: form.value,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        form.reset();
      }
    });
  }

}
