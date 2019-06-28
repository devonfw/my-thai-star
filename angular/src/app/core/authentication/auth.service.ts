import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import * as fromApp from 'app/store/reducers/';
import * as fromAuth from 'app/user-area/store/selectors/';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Injectable()
export class AuthService {
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
