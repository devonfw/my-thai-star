import { CoreModule } from '../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SnackBarService } from '../shared/snackService/snackService.service';
import { EmailConfirmationsService } from './shared/email-confirmations.service';

import { EmailConfirmationsComponent } from './email-confirmations.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [
    EmailConfirmationsService,
    SnackBarService,
  ],
  declarations: [
    EmailConfirmationsComponent,
  ],
  exports: [
    EmailConfirmationsComponent,
  ],
})
export class EmailConfirmationModule { }
