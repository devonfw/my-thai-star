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
    this.invitationService.postInvitationTable(this.invitationService.composeInvitation(this.data)).subscribe( () => {
      this.snackBar.openSnack('Table succesfully booked', 4000, 'black');
    });
    this.dialog.close(true);
  }

}
