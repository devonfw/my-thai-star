import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { AuthService } from '../core/authentication/auth.service';
import { AuthGuardService } from '../core/authentication/auth-guard.service';
import { UserAreaService } from './shared/user-area.service';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { TwitterDialogComponent } from './twitter-dialog/twitter-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TwoFactorDialogComponent } from './two-factor-dialog/two-factor-dialog.component';
import { QrCodeDialogComponent } from './qr-code-dialog/qr-code-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    UserAreaService,
    AuthGuardService,
    AuthService,
  ],

  declarations: [
    LoginDialogComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
    TwoFactorDialogComponent,
    QrCodeDialogComponent,
  ],
  exports: [
    LoginDialogComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
    TwoFactorDialogComponent,
    QrCodeDialogComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
  ],
})
export class UserAreaModule { }
