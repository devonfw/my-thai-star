import { CovalentModule } from '../shared/covalent.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { appRoutes } from '../app.routes';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentModule,
    MaterialModule,
    appRoutes,
  ],
  providers: [
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
