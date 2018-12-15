import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppLoadService } from './app-load.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: AppLoadService.factory, deps: [AppLoadService], multi: true }
  ]
})
export class AppLoadModule { }
