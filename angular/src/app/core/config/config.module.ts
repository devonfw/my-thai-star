import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './config.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigService.factory,
      deps: [ConfigService],
      multi: true,
    },
  ],
})
export class ConfigModule {}
