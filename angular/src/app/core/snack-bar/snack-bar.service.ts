import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class SnackBarService {
  public snackBarConfig: MatSnackBarConfig;
  constructor(public snackBar: MatSnackBar) {}

  openSnack(message: string, duration: number, color: string): void {
    this.snackBarConfig = {
      duration: duration,
      panelClass: ['bgc-' + color + '-600'],
    };

    this.snackBar.open(message, 'OK', this.snackBarConfig);
  }
}
