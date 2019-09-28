import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromApp from 'app/store/reducers/';
import * as fromAuth from 'app/user-area/store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  private twoFactorStatus = false;

  logged$: Observable<boolean>;
  role$: Observable<string>;
  userName$: Observable<string>;

  constructor(
    private store: Store<fromApp.State>,
    private configService: ConfigService,
  ) {
    this.role$ = this.store.pipe(select(fromAuth.getRole));
    this.userName$ = this.store.pipe(select(fromAuth.getUserName));
    this.logged$ = this.store.pipe(select(fromAuth.getLogged));
  }

  public getTwoFactorStatus(): boolean {
    return this.twoFactorStatus;
  }

  public setTwoFactorStatus(status: boolean): void {
    this.twoFactorStatus = status;
  }

  public isLogged(): Observable<boolean> {
    return this.logged$;
  }

  public getUser(): Observable<string> {
    return this.userName$;
  }

  public getRole(): Observable<string> {
    return this.role$;
  }
}
