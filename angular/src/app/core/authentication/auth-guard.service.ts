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
import {select, Store} from '@ngrx/store';
import {AuthState, getUserState} from '../../user-area/store/reducers';
import * as fromStore from '../../user-area/store/reducers';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthActionTypes, LoginFail} from '../../user-area/store/actions/auth.actions';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public snackBar: SnackBarService,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    private store: Store<AuthState>
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {

    this.store.select(getUserState).subscribe(
      status => {
        if (!status.logged && status.currentRole !== 'WAITER') {
          return of(false);
        } else if (!status.logged) {
          this.translate.get('alerts.accessError').subscribe((text: string) => {
            this.snackBar.openSnack(text, 4000, 'red');
          });
        }
    });

    if (this.router.url === '/') {
      this.router.navigateByUrl('/restaurant');
    }

    return of(true);
  }
}
