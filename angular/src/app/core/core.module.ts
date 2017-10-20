import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {
  Md2Module,
  NoConflictStyleCompatibilityMode,
  MATERIAL_COMPATIBILITY_MODE,
} from 'md2';
import { CdkTableModule } from '@angular/cdk/table';
import {
  CovalentChipsModule,
  CovalentLayoutModule,
  CovalentExpansionPanelModule,
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentDialogsModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentCommonModule,
} from '@covalent/core';
import { MomentModule } from 'angular2-moment';

import { WindowService } from './windowService/windowService.service';
import { SnackBarService } from './snackService/snackService.service';
import { HttpClientService } from './httpClient/httpClient.service';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthService } from './authentication/auth.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CdkTableModule,
    Md2Module,
    NoConflictStyleCompatibilityMode,
  ],
  exports: [
    CommonModule,
    CovalentChipsModule,
    CovalentLayoutModule,
    CovalentExpansionPanelModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentMediaModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NotFoundComponent,
    MomentModule,
    Md2Module,
  ],
  declarations: [ NotFoundComponent ],
  providers: [
    AuthService,
    AuthGuardService,
    HttpClientService,
    SnackBarService,
    WindowService,
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },
  ],
})

export class CoreModule { }
