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
    if (this.authService.isLogged) { return true; }

    // Open login error snack bar
    this.snackBar.open('Access denied, please try again', '', {
      duration: 4000,
    });

    if (this.router.url === '/') {
      this.router.navigate(['/restaurant']);
    }
    return false;
  }
}
