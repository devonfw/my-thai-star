import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
  ],
  providers: [
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule { }
