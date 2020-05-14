import { TranslocoTestingModule, TranslocoConfig } from '@ngneat/transloco';
import { EN } from 'assets/en';

export function getTranslocoModule(config: Partial<TranslocoConfig> = {}) {
  return TranslocoTestingModule.withLangs(
    { EN },
    {
      availableLangs: ['en'],
      defaultLang: 'en',
      ...config
    }
  );
}
