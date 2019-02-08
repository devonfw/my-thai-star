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

/* @export
 * @class AuthGuardService
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuardService implements CanActivate {
  /* Creates an instance of AuthGuardService.
   * @param {SnackBarService} snackBar
   * @param {AuthService} authService
   * @param {TranslateService} translate
   * @param {Router} router
   * @memberof AuthGuardService
   */
  constructor(
    public snackBar: SnackBarService,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
  ) {}

  /* @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof AuthGuardService
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.isLogged() && this.authService.isPermited('WAITER')) {
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
