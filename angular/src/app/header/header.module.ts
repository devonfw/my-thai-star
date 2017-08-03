import { CovalentModule } from '../shared/covalent.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentModule,
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
