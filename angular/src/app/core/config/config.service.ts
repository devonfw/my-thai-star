import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'app/store';
import { Observable, Subscription } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Config, config } from './config';
import * as configActions from './store/actions/config.actions';
import { getConfig } from './store/selectors';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Config | undefined = config;
  private subscription: Subscription;

  constructor(private store: Store<State>) {}

  static factory(appLoadService: ConfigService): () => Promise<any> {
    return () => appLoadService.loadExternalConfig();
  }

  loadExternalConfig(): Promise<any> {
    if (!environment.loadExternalConfig) {
      return;
    }

    this.store.dispatch(configActions.loadConfig());
    return new Promise((resolve) =>
      this.store
        .pipe(
          select(getConfig),
          skipWhile(
            (newConfig) =>
              !newConfig.loaded ||
              (!newConfig.pending && newConfig.errorMessage !== undefined),
          ),
        )
        .subscribe((value) => {
          this.config = value;
          resolve(value);
        }),
    );
  }

  getRestServiceRoot(): Observable<string> {
    return this.store.pipe(
      select(getConfig),
      skipWhile((newConfig) => !newConfig.loaded),
      map((newConfig) => newConfig.restServiceRoot),
    );
  }

  getRestPathRoot(): Observable<string> {
    return this.store.pipe(
      select(getConfig),
      skipWhile((newConfig) => !newConfig.loaded),
      map((newConfig) => newConfig.restPathRoot),
    );
  }

  getValues(): Config | undefined {
    return this.config;
  }
}
