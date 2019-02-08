import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class SnackBarService {
  public snackBarConfig: MatSnackBarConfig;
  /* Creates an instance of SnackBarService.
   * @param {MatSnackBar} snackBar
   * @memberof SnackBarService
   */
  constructor(public snackBar: MatSnackBar) {}

  /* @param {string} message
   * @param {number} duration
   * @param {string} color
   * @memberof SnackBarService
   */
  openSnack(message: string, duration: number, color: string): void {
    this.snackBarConfig = {
      duration: duration,
      panelClass: ['bgc-' + color + '-600'],
    };

    this.snackBar.open(message, 'OK', this.snackBarConfig);
  }
}
