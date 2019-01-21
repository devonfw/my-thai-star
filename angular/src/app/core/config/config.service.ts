import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, config } from './config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private httpClient: HttpClient) {}

  static factory(appLoadService: ConfigService) {
    return () => appLoadService.loadExternalConfig();
  }

  // this method gets external configuration calling /config endpoint and merges into config object
  loadExternalConfig(): Promise<any> {
    if (!environment.loadExternalConfig) {
      return Promise.resolve({});
    }

    const promise = this.httpClient
      .get('/config')
      .toPromise()
      .then((settings) => {
        Object.keys(settings || {}).forEach((k) => {
          config[k] = settings[k];
        });
        return settings;
      })
      .catch((error) => {
        return 'ok, no external configuration';
      });

    return promise;
  }

  getValues(): Config {
    return config;
  }
}
