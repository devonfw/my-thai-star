import { Injectable } from '@angular/core';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: SnackBarService) {
  }

  public success(message: string): void {
    this.snackBar.openSnack(message, 4000, 'green');
  }

  public fail(message: string): void {
    this.snackBar.openSnack(message, 4000, 'red');
  }

  public info(message: string): void {
    this.snackBar.openSnack(message, 4000, 'black');
  }
}
