import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';
import { CovalentModule } from '../shared/covalent.module';

import { AuthService } from '../shared/authentication/auth.service';
import { AuthGuard } from '../shared/authentication/auth-guard.service';
import { UserAreaService } from './shared/user-area.service';
import { EqualValidatorDirective } from './shared/equal-validator.directive';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { TwitterDialogComponent } from './twitter-dialog/twitter-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CovalentModule,
  ],
  providers: [
    UserAreaService,
    AuthGuard,
    AuthService,
  ],

  declarations: [
    EqualValidatorDirective,
    LoginDialogComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
  ],
  exports: [
    EqualValidatorDirective,
    LoginDialogComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
  ],
})
export class UserAreaModule { }
