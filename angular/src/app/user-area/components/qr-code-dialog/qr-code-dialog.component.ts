import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAreaService } from '../../services/user-area.service';
import { SnackService } from '../../services/snack-bar.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { TwoFactorResponse } from '../../../shared/view-models/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss'],
})
export class QrCodeDialogComponent implements OnInit, OnDestroy {
  public twoFactorStatus: boolean;
  public qrSecret = true;
  public qrcode: string;
  public secret: string;
  private ngUnsubscribe = new Subject();

  constructor(
    public authService: AuthService,
    private snackBar: SnackService,
    public userAreaService: UserAreaService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private initialize(): void {
    if (this.authService.getTwoFactorStatus()) {
      this.loadQrCode();
    }
  }

  private loadData(): void {
    this.userAreaService
      .twoFactorStatus()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: TwoFactorResponse) => {
          this.twoFactorStatus = res.twoFactorStatus;
          this.authService.setTwoFactorStatus(res.twoFactorStatus);
          this.initialize();
        },
        (err: HttpErrorResponse) => {
          this.snackBar.fail(err.message);
        },
      );
  }

  public changeQrSecret(): void {
    this.qrSecret = !this.qrSecret;
  }

  public changeStatus(): void {
    this.twoFactorStatus = !this.twoFactorStatus;
    this.resetQrCode();
    this.userAreaService
      .changeTwoFactor(this.twoFactorStatus)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: TwoFactorResponse) => {
          this.loadQrCode();
        },
        (err: HttpErrorResponse) => {
          this.snackBar.fail(err.message);
        },
      );
  }

  private loadQrCode(): void {
    if (this.twoFactorStatus) {
      this.userAreaService
        .pairing()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res: TwoFactorResponse) => {
            this.qrcode = res.base64QrCode;
            this.secret = res.secret;
          },
          (err: HttpErrorResponse) => {
            this.snackBar.fail(err.message);
          },
        );
    }
  }

  private resetQrCode(): void {
    if (!this.twoFactorStatus) {
      this.qrcode = '';
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
