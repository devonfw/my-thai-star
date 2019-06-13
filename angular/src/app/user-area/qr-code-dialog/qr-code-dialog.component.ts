import { Component, OnInit } from '@angular/core';
import { UserAreaService } from '../shared/user-area.service';
import { SnackService } from '../shared/snack-bar.service';
import { AuthService } from '../../core/authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TwoFactorResponse } from '../../shared/view-models/interfaces';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss'],
})
export class QrCodeDialogComponent implements OnInit {
  public twoFactorStatus: boolean;
  public qrSecret = true;
  public qrcode: string;
  public secret: string;
  public qrSecretText = 'QR';
  private qrText = 'QR';
  private secretText = 'Secret code';

  constructor(
    public authService: AuthService,
    private snackBar: SnackService,
    public userAreaService: UserAreaService,
    public translate: TranslateService,
  ) {
    this.translate
      .get('userArea.qrcodeDialog.qrSwitchText')
      .subscribe((content: string = 'QR') => {
        this.qrText = content;
      });

    this.translate
      .get('userArea.qrcodeDialog.secretSwitchText')
      .subscribe((content: string = 'Secret code') => {
        this.secretText = content;
      });
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
        this.snackBar.fail(err.message);
      },
    );
  }

  public changeQrSecret(): void {
    this.qrSecret = !this.qrSecret;

    if (this.qrSecret) {
      this.qrSecretText = this.qrText;
    } else {
      this.qrSecretText = this.secretText;
    }
  }

  public changeStatus(): void {
    this.twoFactorStatus = !this.twoFactorStatus;
    this.resetQrCode();
    this.userAreaService.changeTwoFactor(this.twoFactorStatus).subscribe(
      (res: any) => {
        this.loadQrCode();
      },
      (err: any) => {
        this.snackBar.fail(err.message);
      },
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
          this.snackBar.fail(err.message);
        },
      );
    }
  }

  private resetQrCode() {
    if (!this.twoFactorStatus) {
      this.qrcode = '';
    }
  }
}
