import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { UserAreaService } from "../shared/user-area.service";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent implements OnInit {

  private qrcode: string;
  private secret: string;

  constructor(
    private dialog: MatDialogRef<QrCodeDialogComponent>,
    private snackBar: SnackBarService,
    private userAreaService: UserAreaService
  ) {}

  ngOnInit(): void {
    this.loadQrCode();
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
