import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import {BookTable, InviteFriends} from '../../store/actions/book-table.actions';
import {Store} from '@ngrx/store';
import * as fromBookTable from '../../store/reducers/book-table.reducer';

@Component({
  selector: 'public-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss'],
})
export class InvitationDialogComponent implements OnInit {
  data: any;
  date: string;

  constructor(
    private store: Store<fromBookTable.State>,
    private dialog: MatDialogRef<InvitationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    this.data = dialogData;
  }

  ngOnInit(): void {
    this.date = moment(this.data.bookingDate).format('LLL');
  }

  sendInvitation(): void {
    this.store.dispatch(new InviteFriends({booking: this.data}));
    this.dialog.close(true);
  }
}
