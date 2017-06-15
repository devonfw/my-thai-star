import { BackendType } from '../app/shared/backend/backend.module';

export const environment: {production: boolean, backendType: BackendType, envName: string, restPathRoot: string, restServiceRoot: string} = {
  production: false,
  backendType: BackendType.REST,
  envName: 'prodcompose',
  restPathRoot: 'http://de-mucdevondepl01:9091/mythaistar/',
  restServiceRoot: 'http://de-mucdevondepl01:9091/mythaistar/services/rest/',
};
