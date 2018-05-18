import { InvitationResponse } from '../shared/viewModels/interfaces';
import { EmailConfirmationsService } from './shared/email-confirmations.service';
import { SnackBarService } from '../core/snackService/snackService.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'public-email-confirmations',
  templateUrl: './email-confirmations.component.html',
  styleUrls: ['./email-confirmations.component.scss'],
})
export class EmailConfirmationsComponent implements OnInit {
  private action: string;
  private token: string;

  constructor(
    private snackBarService: SnackBarService,
    private emailService: EmailConfirmationsService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    let errorString: string;
    let errorUrlString: string;
    let emailConfirmationStrings: any;
    forkJoin(
      this.translate.get('alerts.genericError'),
      this.translate.get('alerts.urlError'),
      this.translate.get('alerts.email confirmations'),
    ).subscribe((translation: any) => {
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
            (error: any) => {
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
            (error: any) => {
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
            (error: any) => {
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
            (error: any) => {
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
    this.router.navigate(['restaurant']);
  }
}
