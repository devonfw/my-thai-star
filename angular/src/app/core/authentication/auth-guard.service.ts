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
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from 'app/store/reducers';
import * as fromAuth from 'app/user-area/store/selectors';
import {map} from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public snackBar: SnackBarService,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    private store: Store<fromApp.State>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return combineLatest(
        this.store.select(fromAuth.getRole),
        this.store.select(fromAuth.getLogged)
      ).pipe(
        map(([role, logged]) => {
          if ((state.url === '/prediction' || state.url === '/clustering') && role === 'MANAGER' && logged) {
            return true;
          }

          if ((state.url === '/orders' || state.url === '/reservations') && role === 'WAITER' && logged) {
            return true;
          }

          if (!logged) {
            this.translate.get('alerts.accessError').subscribe((text: string) => {
              this.snackBar.openSnack(text, 4000, 'red');
            });
          }

          if (this.router.url === '/') {
            this.router.navigate(['/restaurant']);
          }

          return false;
        })
    );
  }
}
