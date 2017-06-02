import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { CovalentModule } from '../shared/covalent.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentModule,
    MaterialModule,
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
