import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { OwlDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
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
import { MomentModule } from 'ngx-moment';

import { WindowService } from './windowService/windowService.service';
import { SnackBarService } from './snackService/snackService.service';
import { HttpRequestInterceptorService } from './interceptor/httpRequestInterceptor.service';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthService } from './authentication/auth.service';

import { NotFoundComponent } from './not-found/not-found.component';

// Moment locales
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/hi';
import 'moment/locale/pl';
import 'moment/locale/nl';
import 'moment/locale/de';
import 'moment/locale/ca';

// Default text strings for OwlDateTime
export class DefaultIntl {
  cancelBtnLabel: string = '\u{2716}';
  setBtnLabel: String = '\u{2714}';
}

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
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
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
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    HttpClientModule,
  ],
  declarations: [NotFoundComponent],
  providers: [
    AuthService,
    AuthGuardService,
    SnackBarService,
    WindowService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true,
    },
    { provide: OwlDateTimeIntl, useClass: DefaultIntl },
  ],
})
export class CoreModule {}
