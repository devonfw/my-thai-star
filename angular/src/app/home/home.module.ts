import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { HomeComponent } from './container/home/home.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  imports: [CommonModule, CoreModule, TranslocoRootModule],
  providers: [],
  declarations: [HomeComponent, HomeLayoutComponent, HomeCardComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
