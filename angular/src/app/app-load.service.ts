import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';


@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient) { }

  static factory(appLoadService: AppLoadService) {
    return () => appLoadService.getExternalConfig();
  }

  //this method gets external configuration calling /config endpoint and merges into config object
  getExternalConfig(): Promise<any> {
    if (!config.loadExternalConfig) {
      return Promise.resolve({});
    }

    const promise = this.httpClient.get('/config')
      .toPromise()
      .then(settings => {
        Object.keys(settings || {}).forEach(k => {
          config[k] = settings[k];
        });
        return settings;
      })
      .catch(error => {
        return "ok, no external configuration"
      });

    return promise;
  }
}
