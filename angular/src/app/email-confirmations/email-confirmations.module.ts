import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { EmailConfirmationsComponent } from './container/email-confirmations/email-confirmations.component';
import { EmailConfirmationsRoutingModule } from './email-confirmations-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmailConfirmationsService } from './services/email-confirmations.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    EmailConfirmationsRoutingModule,
  ],
  providers: [EmailConfirmationsService],
  declarations: [EmailConfirmationsComponent],
  exports: [EmailConfirmationsComponent],
})
export class EmailConfirmationModule {}
