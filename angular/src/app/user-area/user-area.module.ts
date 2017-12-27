import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { AuthService } from '../core/authentication/auth.service';
import { AuthGuardService } from '../core/authentication/auth-guard.service';
import { UserAreaService } from './shared/user-area.service';

import { TwitterDialogComponent } from './twitter-dialog/twitter-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
  ],
  providers: [
    UserAreaService,
    AuthGuardService,
    AuthService,
  ],

  declarations: [
    TwitterDialogComponent,
  ],
  exports: [
    TwitterDialogComponent,
  ],
  entryComponents: [
    TwitterDialogComponent,
  ],
})
export class UserAreaModule { }
