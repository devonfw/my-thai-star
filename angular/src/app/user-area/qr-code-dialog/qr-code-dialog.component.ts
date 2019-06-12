import { Component, OnInit } from '@angular/core';
import { UserAreaService } from '../shared/user-area.service';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';
import { AuthService } from '../../core/authentication/auth.service';
import { MatDialogRef } from "@angular/material";
import { TwoFactorResponse } from "../../shared/view-models/interfaces";

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent implements OnInit {
  public twoFactorStatus: boolean;
  public qrcode: string;
  public secret: string;

  constructor(
    public authService: AuthService,
    private snackBar: SnackBarService,
    public userAreaService: UserAreaService,
    private dialog: MatDialogRef<QrCodeDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private initialize() {
    if (this.authService.getTwoFactorStatus()) {
      this.loadQrCode();
    }
  }

  private loadData(): void {
    this.userAreaService.twoFactorStatus().subscribe(
      (res: TwoFactorResponse) => {
        this.twoFactorStatus = res.twoFactorStatus;
        this.authService.setTwoFactorStatus(res.twoFactorStatus);
        this.initialize();
      },
      (err: any) => {
        this.snackBar.openSnack(err.message, 4000, 'red');
      }
    );
  }

  public changeStatus(): void {
    this.twoFactorStatus = !this.twoFactorStatus;
    this.authService.setTwoFactorStatus(this.twoFactorStatus);
    this.resetQrCode();
    this.userAreaService.changeTwoFactor(this.twoFactorStatus).subscribe(
      (res: any) => {
        this.loadQrCode();
      },
      (err: any) => {
        this.snackBar.openSnack(err.message, 4000,
          'red');
      }
    );
  }

  private loadQrCode(): void {
    if (this.twoFactorStatus) {
      this.userAreaService.pairing().subscribe(
        (res: TwoFactorResponse) => {
          this.qrcode = res.base64QrCode;
          this.secret = res.secret;
        },
        (err: any) => {
          this.snackBar.openSnack(err.message, 4000, 'red');
        }
      );
    }
  }

  private resetQrCode() {
    if (!this.twoFactorStatus) {
      this.qrcode = '';
    }
  }
}
