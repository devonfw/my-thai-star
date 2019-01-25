import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';

import { WaiterCockpitService } from './shared/waiter-cockpit.service';
import { WindowService } from '../core/window/window.service';

import { ReservationCockpitComponent } from './reservation-cockpit/reservation-cockpit.component';
import { OrderCockpitComponent } from './order-cockpit/order-cockpit.component';
import { OrderDialogComponent } from './order-cockpit/order-dialog/order-dialog.component';
import { ReservationDialogComponent } from './reservation-cockpit/reservation-dialog/reservation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    CoreModule,
  ],
  providers: [
    WaiterCockpitService,
    WindowService,
  ],
  declarations: [
    ReservationCockpitComponent,
    OrderCockpitComponent,
    ReservationDialogComponent,
    OrderDialogComponent,
  ],
  exports: [
    ReservationCockpitComponent,
    OrderCockpitComponent,
  ],
  entryComponents: [
    ReservationDialogComponent,
    OrderDialogComponent,
  ],
})
export class WaiterCockpitModule { }
