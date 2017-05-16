import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { ReservationView } from '../../shared/models/interfaces';
import {MD_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';

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
    this.data = {
      date: moment(this.data.date).format('DD/MM/YYYY'),
      hour: moment(this.data.date).format('LT'),
      creationDate: moment().format('DD/MM/YYYY'),
      creationHour: moment().format('LT'),
      nameOwner: this.data.nameOwner,
      emailOwner: this.data.emailOwner,
      reservationId: -1,
      friends: this.data.friends,
    };
    this.invitationService.getTableId().subscribe( (reservationId: number) => {
      this.data.reservationId = reservationId;
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
