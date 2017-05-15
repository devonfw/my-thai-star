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
    if (this.authService.isLogged && this.authService.hasPermission) {
      return true;
    }

    // Open login snack bar
    if (!this.authService.isLogged) {
      this.snackBar.open('Access denied, please try again', 'OK', {
        duration: 4000,
      });
    } else {
      this.snackBar.open('Login successful', 'OK', {
        duration: 4000,
      });
    }

    if (this.router.url === '/') {
      this.router.navigate(['/restaurant']);
    }
    return false;
  }
}
