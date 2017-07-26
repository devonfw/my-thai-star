import { BackendType } from '../app/config';

export const environment: {production: boolean, backendType: BackendType, restPathRoot: any, restServiceRoot: any} = {
  production: true,
  backendType: BackendType.REST,
  restPathRoot: ('${APP_REST_PATH_ROOT}').indexOf('$') < 0 ? '${APP_URL_BACKEND}' : 'http://localhost:8081/mythaistar/',
  restServiceRoot: ('${APP_REST_SERVICE_ROOT}').indexOf('$') < 0 ? '${APP_REST_SERVICE_ROOT}' : 'http://localhost:8081/mythaistar/services/rest/',
};
