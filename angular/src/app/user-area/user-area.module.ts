import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { AuthService } from '../core/authentication/auth.service';
import { AuthGuardService } from '../core/authentication/auth-guard.service';
import { UserAreaService } from './shared/user-area.service';

import { LoginDialogComponent } from './container/login-dialog/login-dialog.component';
import { PasswordDialogComponent } from './container/password-dialog/password-dialog.component';
import { TwitterDialogComponent } from './container/twitter-dialog/twitter-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {AuthEffects} from './store/effects/auth.effects';
import {EffectsModule} from '@ngrx/effects';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([AuthEffects]),
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
    LoginFormComponent,
    SignUpFormComponent,
  ],
  exports: [
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
