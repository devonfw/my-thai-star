import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/reducers';
import * as fromAuth from 'app/user-area/store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { AuthService } from './auth.service';
import * as fromRoot from '../../store';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public snackBar: SnackBarService,
    private authService: AuthService,
    private translocoService: TranslocoService,
    private router: Router,
    private store: Store<fromApp.State>,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return combineLatest(
      this.store.select(fromAuth.getRole),
      this.store.select(fromAuth.getLogged),
    ).pipe(
      map(([role, logged]) => {
        if (
          (state.url === '/prediction' || state.url === '/clustering') &&
          role === 'MANAGER' &&
          logged
        ) {
          return true;
        }

        if (
          (state.url === '/orders' || state.url === '/reservations') &&
          role === 'WAITER' &&
          logged
        ) {
          return true;
        }

        if (!logged) {
          this.translocoService.selectTranslate('alerts.accessError').subscribe((text: string) => {
            this.snackBar.openSnack(text, 4000, 'red');
          });
        }

        if (this.router.url === '/') {
          fromRoot.go({ path: ['/restaurant'] });
        }

        return false;
      }),
    );
  }
}
