import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { InvitationResponse } from '../../../shared/view-models/interfaces';
import * as fromRoot from '../../../store';
import { EmailConfirmationsService } from '../../services/email-confirmations.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-public-email-confirmations',
  templateUrl: './email-confirmations.component.html',
  styleUrls: ['./email-confirmations.component.scss'],
})
export class EmailConfirmationsComponent implements OnInit {
  private action: string;
  private token: string;

  constructor(
    private snackBarService: SnackBarService,
    private emailService: EmailConfirmationsService,
    private translocoService: TranslocoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    let errorString: string;
    let errorUrlString: string;
    let emailConfirmationStrings: any;
    forkJoin([
      this.translocoService.translate('alerts.genericError'),
      this.translocoService.translate('alerts.urlError'),
      this.translocoService.translate('alerts.email confirmations'),
    ]).subscribe((translation: any) => {
      errorString = translation[0];
      errorUrlString = translation[1];
      emailConfirmationStrings = translation[2];
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
      this.action = params.get('action');
      switch (this.action) {
        case 'acceptInvite':
          this.emailService.sendAcceptInvitation(this.token).subscribe(
            (res: InvitationResponse) => {
              this.snackBarService.openSnack(
                emailConfirmationStrings.invitationAccept,
                10000,
                'green',
              );
            },
            (error: Error) => {
              this.snackBarService.openSnack(errorString, 10000, 'red');
            },
          );
          break;
        case 'rejectInvite':
          this.emailService.sendRejectInvitation(this.token).subscribe(
            (res: InvitationResponse) => {
              this.snackBarService.openSnack(
                emailConfirmationStrings.invitationReject,
                10000,
                'red',
              );
            },
            (error: Error) => {
              this.snackBarService.openSnack(errorString, 10000, 'red');
            },
          );
          break;
        case 'cancel':
          this.emailService.sendCancelBooking(this.token).subscribe(
            (res: InvitationResponse) => {
              this.snackBarService.openSnack(
                emailConfirmationStrings.bookingCancel,
                10000,
                'green',
              );
            },
            (error: Error) => {
              this.snackBarService.openSnack(errorString, 10000, 'red');
            },
          );
          break;
        case 'cancelOrder':
          this.emailService.sendCancelOrder(this.token).subscribe(
            (res: boolean) => {
              this.snackBarService.openSnack(
                emailConfirmationStrings.orderCancel,
                10000,
                'green',
              );
            },
            (error: Error) => {
              this.snackBarService.openSnack(errorString, 10000, 'red');
            },
          );
          break;
        default:
          this.snackBarService.openSnack(errorUrlString, 10000, 'black');
          break;
      }
    });
    // Navigate to home
    fromRoot.go({ path: ['/restaurant'] });
  }
}
