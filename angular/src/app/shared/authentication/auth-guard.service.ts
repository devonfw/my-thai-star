import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public snackBar: MdSnackBar,
              private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Remark: isLogged and hasPermission should be service methods, not properties
    if (this.authService.isLogged && this.authService.hasPermission) {
      return true;
    }

    // Remark: And what if a server error occured? if we want to be sure that access is denied, we should
    // check if user has permissions to access the view.
    // Open login snack bar
    if (!this.authService.isLogged) {
      this.snackBar.open('Access denied, please try again', 'OK', {
        // Remark: snack bar configs around the app are quite similar, maybe extract that to a small factory if those should be consistent?
        duration: 4000,
        extraClasses: ['bgc-red-600'],
      });
    } else {
      this.snackBar.open('Login successful', 'OK', {
        duration: 4000,
        extraClasses: ['bgc-green-600'],
      });
    }

    if (this.router.url === '/') {
      this.router.navigate(['/restaurant']);
    }
    return false;
  }
}
