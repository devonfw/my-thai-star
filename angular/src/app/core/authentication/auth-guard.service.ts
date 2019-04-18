import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public snackBar: SnackBarService,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (state.url === '/prediction' && this.authService.isLogged() && this.authService.isPermited('MANAGER')) {
      return true;
    }

    if ((state.url === '/orders' || state.url === '/reservations') && this.authService.isLogged() && this.authService.isPermited('WAITER')) {
      return true;
    }

    if (!this.authService.isLogged()) {
      this.translate.get('alerts.accessError').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'red');
      });
    }

    if (this.router.url === '/') {
      this.router.navigate(['/restaurant']);
    }
    return false;
  }
}
