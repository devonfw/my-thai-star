import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeCardComponent } from './home-card/home-card.component';

@NgModule({
  imports: [CommonModule, CoreModule, TranslateModule],
  providers: [],
  declarations: [HomeComponent, HomeLayoutComponent, HomeCardComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
