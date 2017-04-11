import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss']
})
export class InvitationDialogComponent {

  data: any= {
    date: '',
    time: '',
    name: '',
    email: '',
    invitations: []
  };

  constructor(private dialog: MdDialogRef<InvitationDialogComponent>) {
    this.data = dialog.config.data;
    this.data.date = moment(dialog.config.data.dateTime, moment.ISO_8601).format('L');
    this.data.time = moment(dialog.config.data.dateTime, moment.ISO_8601).format('LT');
  }

  sendInvitation(): void {
    alert('invitation sended');
  }

}
