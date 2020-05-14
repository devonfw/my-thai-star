import { TranslocoTestingModule, TranslocoConfig } from '@ngneat/transloco';
import { DefaultENTest } from 'assets/default.en.test';

export function getTranslocoModule(config: Partial<TranslocoConfig> = {}) {
  return TranslocoTestingModule.withLangs(
    { DefaultENTest },
    {
      availableLangs: ['en'],
      defaultLang: 'en',
      ...config
    }
  );
}
