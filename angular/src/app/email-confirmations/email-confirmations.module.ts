import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { EmailConfirmationsComponent } from './email-confirmations.component';

import { EmailConfirmationsService } from './shared/email-confirmations.service';

import { EmailConfirmationsRoutingModule } from './email-confirmations-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    EmailConfirmationsRoutingModule,
  ],
  providers: [
    EmailConfirmationsService,
  ],
  declarations: [
    EmailConfirmationsComponent,
  ],
  exports: [
    EmailConfirmationsComponent,
  ],
})
export class EmailConfirmationModule { }
