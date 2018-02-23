import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

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
              private translateService: TranslateService,
              private dialog: MatDialogRef<InvitationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) dialogData: any) {
                 this.data = dialogData;
  }

  ngOnInit(): void {
    this.date = moment(this.data.bookingDate).format('LLL');
  }

  sendInvitation(): void {
    this.invitationService.postBooking(this.invitationService.composeBooking(this.data, 1)).subscribe(() => {
      this.translateService.get('bookTable.dialog.bookingSuccess')
          .subscribe((text: string) => {
            this.snackBar.openSnack(text, 4000, 'green');
          });
    }, (error: any) => {
      this.translateService.get('bookTable.dialog.bookingError')
          .subscribe((text: string) => {
            this.snackBar.openSnack(text, 4000, 'red');
          });
    });
    this.dialog.close(true);
  }

}
