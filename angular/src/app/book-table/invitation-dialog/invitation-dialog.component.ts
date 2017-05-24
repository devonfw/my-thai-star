import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { BookingInfo } from '../../shared/backend/backendModels/interfaces';
import { MD_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { assign } from 'lodash';

@Component({
  selector: 'public-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss'],
})
export class InvitationDialogComponent implements OnInit {

  data: ReservationView;

  constructor(private snackBar: MdSnackBar,
              private invitationService: BookTableService,
              private dialog: MdDialogRef<InvitationDialogComponent>,
              @Inject(MD_DIALOG_DATA) dialogData: any) {
                 this.data = dialogData;
  }
  ngOnInit(): void {
    this.data.date = moment(this.data.date).format('LLL');
    this.invitationService.getTableId().subscribe( (bookingId: number) => {
        this.data.bookingId = bookingId;
      });
  }

  sendInvitation(): void {
    let bookTable: BookingInfo;
    assign(bookTable, this.data);
    bookTable.orders = [];
    this.invitationService.postInvitationTable(bookTable).subscribe( () => {
      this.snackBar.open('Table succesfully booked', 'OK', {
        duration: 7000,
      });
    });
    this.dialog.close(true);
  }

}
