import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

    constructor(public snackBar: MdSnackBar) { }

    openSnack(message: string, duration: number, color: string): void {
            this.snackBar.open(message, 'OK', {
                duration: duration,
                extraClasses: ['bgc-' + color + '-600'],
            });
    }
}
