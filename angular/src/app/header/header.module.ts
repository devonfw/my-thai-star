import { CoreModule } from '../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    AppRoutingModule,
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
