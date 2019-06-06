import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material";
import { UserAreaService } from "../shared/user-area.service";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";
import { WindowService } from "../../core/window/window.service";
import { AuthService } from "../../core/authentication/auth.service";

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent implements OnInit {

  @Input()
  private twoFactorStatus: boolean;
  private qrcode: string;
  private secret: string;
  private color = 'accent';

  constructor(
    public window: WindowService,
    public authService: AuthService,
    private dialog: MatDialogRef<QrCodeDialogComponent>,
    private nestedDialog: MatDialog,
    private snackBar: SnackBarService,
    private userAreaService: UserAreaService
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
    )
  }

  private changeStatus(): void {
    this.twoFactorStatus = !this.twoFactorStatus;
    this.authService.setTwoFactorStaus(this.twoFactorStatus);
    this.userAreaService.changeTwoFactor(this.twoFactorStatus).subscribe(
      (res: any) => {},
      (err: any) => {
        this.snackBar.openSnack(err.message, 4000, 'red');
      }
    )
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
    )
  }
}
