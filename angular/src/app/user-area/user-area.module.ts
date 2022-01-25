import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuardService } from '../core/authentication/auth-guard.service';
import { AuthService } from '../core/authentication/auth.service';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { QrCodeDialogComponent } from './components/qr-code-dialog/qr-code-dialog.component';
import { TwitterDialogComponent } from './components/twitter-dialog/twitter-dialog.component';
import { TwoFactorDialogComponent } from './components/two-factor-dialog/two-factor-dialog.component';
import { UserAreaService } from './services/user-area.service';
import { effects, reducers } from './store';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TranslocoModule,
        HttpClientModule,
        CoreModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature(effects),
    ],
    providers: [UserAreaService, AuthGuardService, AuthService],
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
    ]
})
export class UserAreaModule {}
