import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
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
import { OwlDateTimeModule, OwlDateTimeIntl, OwlNativeDateTimeModule } from '@busacca/ng-pick-datetime';
import { CdkTableModule } from '@angular/cdk/table';
import { MomentModule } from 'ngx-moment';

import { WindowService } from './window/window.service';
import { SnackBarService } from './snack-bar/snack-bar.service';
import { HttpRequestInterceptorService } from './interceptor/http-request-interceptor.service';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthService } from './authentication/auth.service';

import { NotFoundComponent } from './not-found/not-found.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';

// Moment locales
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/hi';
import 'moment/locale/pl';
import 'moment/locale/nl';
import 'moment/locale/de';
import 'moment/locale/ca';

// Default text strings for OwlDateTime
export class DefaultIntl extends OwlDateTimeIntl {
  cancelBtnLabel = '\u{2716}';
  setBtnLabel = '\u{2714}';
}

@NgModule({
  imports: [
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CdkTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
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
    NotSupportedComponent,
    MomentModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
  ],
  declarations: [
    NotFoundComponent,
    NotSupportedComponent
  ],
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
