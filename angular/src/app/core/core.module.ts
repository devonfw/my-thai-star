import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  MatDividerModule,
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  OwlDateTimeIntl,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@busacca/ng-pick-datetime';
// Moment locales
import 'moment/locale/ca';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/hi';
import 'moment/locale/nl';
import 'moment/locale/pl';
import { MomentModule } from 'ngx-moment';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthService } from './authentication/auth.service';
import { HttpRequestInterceptorService } from './interceptor/http-request-interceptor.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { SnackBarService } from './snack-bar/snack-bar.service';
import { WindowService } from './window/window.service';

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
    MatDividerModule,
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
  declarations: [NotFoundComponent, NotSupportedComponent],
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
