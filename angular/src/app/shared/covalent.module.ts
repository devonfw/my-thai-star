import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovalentChipsModule,
         CovalentLayoutModule,
         CovalentExpansionPanelModule,
         CovalentDataTableModule,
         CovalentPagingModule,
         CovalentDialogsModule,
         CovalentLoadingModule,
         CovalentNotificationsModule,
         CovalentCommonModule } from '@covalent/core';
import { MaterialModule } from '@angular/material';

@NgModule({
  exports: [
    CommonModule,
    CovalentChipsModule,
    CovalentLayoutModule,
    CovalentLoadingModule,
    CovalentExpansionPanelModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    CovalentDialogsModule,
    MaterialModule,
  ],
  declarations: [],
  providers: [],
})

export class CovalentModule { }
