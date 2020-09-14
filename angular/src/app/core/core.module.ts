import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { TranslocoRootModule } from '../transloco-root.module';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthService } from './authentication/auth.service';
import { HttpRequestInterceptorService } from './interceptor/http-request-interceptor.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { SnackBarService } from './snack-bar/snack-bar.service';
import { WindowService } from './window/window.service';

// Default text strings for OwlDateTime
@Injectable()
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
    TranslocoRootModule,
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
    TranslocoRootModule,
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
