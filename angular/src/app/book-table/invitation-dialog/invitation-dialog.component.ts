import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { BookTableService } from '../shared/book-table.service'

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss']
})
export class InvitationDialogComponent implements OnInit {

  // Remark: Again, no information about the type.
  data: any;

  constructor(private snackBar: MdSnackBar,
              private invitationService: BookTableService,
              private dialog: MdDialogRef<InvitationDialogComponent>) {
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
    this.invitationService.postInvitationTable(this.data).subscribe( (data) => {
      this.snackBar.open('Table succesfully booked with id: ' + data.tableId, '', {
        duration: 7000,
      });
    });
    this.dialog.close();
  }

}
