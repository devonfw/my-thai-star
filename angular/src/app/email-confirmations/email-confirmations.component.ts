import { EmailConfirmationsService } from './shared/email-confirmations.service';
import { Observable } from 'rxjs/Rx';
import { SnackBarService } from '../shared/snackService/snackService.service';
import { UrlSegment } from '@angular/router/router';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'public-email-confirmations',
  templateUrl: './email-confirmations.component.html',
  styleUrls: ['./email-confirmations.component.scss'],
})
export class EmailConfirmationsComponent implements OnInit {

  constructor(private snackBarService: SnackBarService,
              private emailService: EmailConfirmationsService,
              private router: Router,
              private route: ActivatedRoute) { }

  resolveToken(token: string): Observable<String> {
    return Observable.of(token);
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.resolveToken(params['token']))
        .subscribe((token: string) => {
           this.route.url
               .subscribe((data: UrlSegment[]) => {
                  switch (data[1].path) {
                    case 'acceptInvite':
                      this.emailService.sendAcceptInvitation(token).subscribe((res: number) => {
                        this.snackBarService.openSnack('Invitation succesfully accepted', 10000, 'green');
                      },
                      (error: any) => {
                        this.snackBarService.openSnack('An error has ocurred, please try again later', 10000, 'green');
                      });
                      break;
                    case 'rejectInvite':
                      this.emailService.sendRejectInvitation(token).subscribe((res: number) => {
                        this.snackBarService.openSnack('Invitation succesfully rejected', 10000, 'red');
                      },
                      (error: any) => {
                        this.snackBarService.openSnack('An error has ocurred, please try again later', 10000, 'red');
                      });
                      break;
                    case 'cancel':
                      this.emailService.sendCancelBooking(token).subscribe((res: number) => {
                        this.snackBarService.openSnack('Booking succesfully canceled', 10000, 'green');
                      },
                      (error: any) => {
                        this.snackBarService.openSnack('An error has ocurred, please try again later', 10000, 'red');
                      });
                      break;
                    case 'cancelOrder':
                      this.emailService.sendCancelBooking(token).subscribe((res: number) => {
                        this.snackBarService.openSnack('Booking succesfully canceled', 10000, 'green');
                      },
                      (error: any) => {
                        this.snackBarService.openSnack('An error has ocurred, please try again later', 10000, 'red');
                      });
                      break;
                    default:
                      this.snackBarService.openSnack('Url not found, please try again', 10000, 'black');
                      break;
                  }
               });
        });
    // this.router.navigate(['restaurant']);
  }

}
