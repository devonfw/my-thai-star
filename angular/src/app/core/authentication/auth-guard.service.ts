import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Store, select } from '@ngrx/store';
import {Observable, of} from 'rxjs';

import * as fromApp from 'app/store/reducers';
import * as fromAuth from 'app/user-area/store/reducers/auth.reducer';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select('auth')
      .pipe(take(1),
        map((authState: fromAuth.State) => {
          if (authState.userData.logged && authState.userData.currentRole === 'WAITER') {
            return true;
          } else {
            if (this.router.url === '/') {
              this.router.navigate(['/restaurant']);
            }
            return false;
          }
        }));
  }
}

