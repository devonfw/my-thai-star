import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { InvitationView } from '../../shared/models/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'public-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss'],
})
export class InvitationDialogComponent implements OnInit {

  data: InvitationView;

  constructor(private snackBar: MdSnackBar,
              private invitationService: BookTableService,
              private dialog: MdDialogRef<InvitationDialogComponent>) {
  }

  ngOnInit(): void {
    this.data = {
      event: {
        date: moment(this.dialog.config.data.dateTime).format('DD/MM/YYYY'),
        hour: moment(this.dialog.config.data.dateTime).format('LT'),
        nameOwner: this.dialog.config.data.name,
        emailOwner: this.dialog.config.data.email,
        reservationId: -1,
      },
      friends: this.dialog.config.data.friends,
    };
    this.invitationService.getTableId().subscribe( (reservationId: number) => {
      this.data.event.reservationId = reservationId;
    });
  }

  sendInvitation(): void {
    this.invitationService.postInvitationTable(this.data).subscribe( () => {
      this.snackBar.open('Table succesfully booked', 'OK', {
        duration: 7000,
      });
    });
    this.dialog.close(true);
  }

}
