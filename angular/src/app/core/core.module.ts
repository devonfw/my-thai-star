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

import { WindowService } from './windowService/windowService.service';
import { SnackBarService } from './snackService/snackService.service';
import { HttpClientService } from './httpClient/httpClient.service';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthService } from './authentication/auth.service';

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
  providers: [
    AuthService,
    AuthGuardService,
    HttpClientService,
    SnackBarService,
    WindowService,
  ],
})

export class CoreModule { }
