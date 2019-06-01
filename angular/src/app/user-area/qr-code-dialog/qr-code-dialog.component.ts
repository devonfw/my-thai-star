import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { UserAreaService } from "../shared/user-area.service";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent implements OnInit {

  private qrcode: any;

  constructor(
    private dialog: MatDialogRef<QrCodeDialogComponent>,
    private snackBar: SnackBarService,
    private userAreaService: UserAreaService
  ) {}

  ngOnInit(): void {

  }

  private loadQrCode(): void {
    this.userAreaService.pairing().subscribe(
      (res: any) => {
        console.log(res);
        
      },
      (err: any) => {
        this.snackBar.openSnack(err.message, 4000, 'red');
      }
    )
  }
}
