import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('config', reducers),
    EffectsModule.forFeature(effects),
  ],
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
