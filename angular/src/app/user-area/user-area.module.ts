import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { AuthService } from '../core/authentication/auth.service';
import { AuthGuardService } from '../core/authentication/auth-guard.service';
import { UserAreaService } from './services/user-area.service';

import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { TwitterDialogComponent } from './components/twitter-dialog/twitter-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [UserAreaService, AuthGuardService, AuthService],

  declarations: [
    LoginDialogComponent,
    PasswordDialogComponent,
    TwitterDialogComponent,
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
export class UserAreaModule {}
