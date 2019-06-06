import { Component, OnInit } from '@angular/core';
import { UserAreaService } from '../shared/user-area.service';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';
import { AuthService } from '../../core/authentication/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent implements OnInit {
  private twoFactorStatus: boolean;
  private qrcode: string;
  private secret: string;
  private color = 'accent';

  constructor(
    public authService: AuthService,
    private snackBar: SnackBarService,
    public userAreaService: UserAreaService,
    private dialogRef: MatDialogRef<QrCodeDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadQrCode();
    this.loadData();
  }

  private loadData(): void {
    this.userAreaService.twoFactorStatus().subscribe(
      (res: any) => {
        this.twoFactorStatus = JSON.parse(res.body)['twoFactorStatus'];
      },
      (err: any) => {
        this.snackBar.openSnack(err.message, 4000, 'red');
      }
    );
  }

  private changeStatus(): void {
    this.twoFactorStatus = !this.twoFactorStatus;
    //this.authService.setTwoFactorStatus(this.twoFactorStatus);
    this.userAreaService.changeTwoFactor(this.twoFactorStatus).subscribe(
      (res: any) => {},
      (err: any) => {
        this.snackBar.openSnack(err.message, 4000,
          'red');
      }
    );
  }

  private loadQrCode(): void {
    this.userAreaService.pairing().subscribe(
      (res: any) => {
        this.qrcode = JSON.parse(res.body)['base64QrCode'];
        this.secret = JSON.parse(res.body)['secret'];
      },
      (err: any) => {
        this.snackBar.openSnack(err.message, 4000, 'red');
      }
    );
  }
}
