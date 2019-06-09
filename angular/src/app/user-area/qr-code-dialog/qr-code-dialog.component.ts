import {Component, OnInit} from '@angular/core';
import {UserAreaService} from '../shared/user-area.service';
import {SnackBarService} from '../../core/snack-bar/snack-bar.service';
import {AuthService} from '../../core/authentication/auth.service';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent implements OnInit {
  public initialstate = false;
  public twoFactorStatus: boolean;
  public qrcode: string;
  public secret: string;
  public color = 'accent';

  constructor(
    public authService: AuthService,
    private snackBar: SnackBarService,
    public userAreaService: UserAreaService,
    private dialog: MatDialogRef<QrCodeDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.loadData();
    this.loadQrCode();
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

  public changeStatus(): void {
    if (!this.initialstate && !this.twoFactorStatus) {
      this.initialstate = true;
      this.twoFactorStatus = true;
    }
    else { this.twoFactorStatus = !this.twoFactorStatus; }
    this.authService.setTwoFactorStatus(this.twoFactorStatus);
    this.resetQrCode();
    this.userAreaService.changeTwoFactor(this.twoFactorStatus).subscribe(
      (res: any) => {
        this.userAreaService.pairing().subscribe(
          (res: any) => {
            this.loadQrCode();
          },
          (err: any) => {
            this.snackBar.openSnack(err.message, 4000,
              'red');
          }
        )
      },
      (err: any) => {
        this.snackBar.openSnack(err.message, 4000,
          'red');
      }
    );
  }

  private resetQrCode() {
    if (!this.twoFactorStatus) {
      this.qrcode = "";
    }
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
