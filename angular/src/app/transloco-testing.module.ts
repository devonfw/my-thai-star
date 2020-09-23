import { ModuleWithProviders } from '@angular/core';
import { TranslocoConfig, TranslocoTestingModule } from '@ngneat/transloco';
import { DefaultENTest } from 'assets/default.en.test';

export function getTranslocoModule(
  config: Partial<TranslocoConfig> = {},
): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.withLangs(
    { DefaultENTest },
    {
      availableLangs: ['en'],
      defaultLang: 'en',
      ...config,
    },
  );
}
