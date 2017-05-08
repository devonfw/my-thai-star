import { BackendType } from '../app/shared/backend/backend.module';

export const environment: {production: boolean, backendType: BackendType} = {
  production: true,
  backendType: BackendType.REST,
};
