import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { InvitationDialogService } from './shared/invitation-dialog.service'

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss']
})
export class InvitationDialogComponent implements OnInit {

  data: any;

  constructor(private invitationService: InvitationDialogService, private dialog: MdDialogRef<InvitationDialogComponent>) {
  }

  ngOnInit(): void {
    this.data = this.dialog.config.data;
    this.data.date = moment(this.dialog.config.data.dateTime, moment.ISO_8601).format('L');
    this.data.time = moment(this.dialog.config.data.dateTime, moment.ISO_8601).format('LT');
    this.invitationService.getTableId().subscribe( (data) => {
      this.data.tableId = data.tableId;
    });
  }

  sendInvitation(): void {
    alert('invitation sended');
    this.dialog.close();
  }

}
