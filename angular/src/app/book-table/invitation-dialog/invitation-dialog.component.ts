import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { BookingInfo } from '../../shared/backend/backendModels/interfaces';
import * as moment from 'moment';
import { assign } from 'lodash';

@Component({
  selector: 'public-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss'],
})
export class InvitationDialogComponent implements OnInit {

  data: ReservationView;

  constructor(private snackBar: SnackBarService,
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
    bookTable = assign(bookTable, this.data);
    bookTable.orders = [];
    bookTable.bookingType = 1;
    this.invitationService.postInvitationTable(bookTable).subscribe( () => {
      this.snackBar.openSnack('Table succesfully booked', 4000, 'black');
    });
    this.dialog.close(true);
  }

}
