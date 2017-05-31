import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { BookingInfo, FriendsInvite } from '../../shared/backend/backendModels/interfaces';
import * as moment from 'moment';
import { assign, unset } from 'lodash';

@Component({
  selector: 'public-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss'],
})
export class InvitationDialogComponent implements OnInit {

  data: any;
  date: string;

  constructor(private snackBar: SnackBarService,
              private invitationService: BookTableService,
              private dialog: MdDialogRef<InvitationDialogComponent>,
              @Inject(MD_DIALOG_DATA) dialogData: any) {
                 this.data = dialogData;
  }
  ngOnInit(): void {
    this.date = moment(this.data.bookingDate).format('LLL');
  }

  sendInvitation(): void {
    this.invitationService.postInvitationTable(this.invitationService.composeInvitation(this.data)).subscribe( () => {
      this.snackBar.openSnack('Table succesfully booked', 4000, 'green');
    }, (error: any) => {
      this.snackBar.openSnack('Error booking, please try again later', 4000, 'red');
    });
    this.dialog.close(true);
  }

}
