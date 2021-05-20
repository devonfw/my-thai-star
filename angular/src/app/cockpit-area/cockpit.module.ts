import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';

import { WaiterCockpitService } from './services/waiter-cockpit.service';
import { WindowService } from '../core/window/window.service';
import { PredictionService } from './services/prediction.service';
import { ClusteringService } from './services/clustering.service';

import { ReservationCockpitComponent } from './reservation-cockpit/reservation-cockpit.component';
import { OrderCockpitComponent } from './order-cockpit/order-cockpit.component';
import { OrderDialogComponent } from './order-cockpit/order-dialog/order-dialog.component';
import { ReservationDialogComponent } from './reservation-cockpit/reservation-dialog/reservation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { PredictionCockpitComponent } from './prediction-cockpit/prediction-cockpit.component';
import { ClusteringCockpitComponent } from './clustering-cockpit/clustering-cockpit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoRootModule } from '../transloco-root.module';
import { OrderArchiveCockpitComponent } from './order-archive-cockpit/order-archive-cockpit.component';
import { AdminCockpitComponent } from './admin-cockpit/admin-cockpit.component';
import { RegisterDialogComponent } from './admin-cockpit/register-dialog/register-dialog.component';
import { DeleteUserDialogComponent } from './admin-cockpit/delete-user-dialog/delete-user-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminService } from './services/admin.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslocoRootModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    WaiterCockpitService,
    WindowService,
    PredictionService,
    ClusteringService,
    AdminService
  ],
  declarations: [
    ReservationCockpitComponent,
    OrderCockpitComponent,
    ReservationDialogComponent,
    OrderDialogComponent,
    PredictionCockpitComponent,
    ClusteringCockpitComponent,
    OrderArchiveCockpitComponent,
    AdminCockpitComponent,
    RegisterDialogComponent,
    DeleteUserDialogComponent

  ],
  exports: [
    ReservationCockpitComponent,
    OrderCockpitComponent,
    PredictionCockpitComponent,
    ClusteringCockpitComponent,
  ],
  entryComponents: [
    ReservationDialogComponent,
    OrderDialogComponent,
    PredictionCockpitComponent,
    ClusteringCockpitComponent,
  ],
})
export class WaiterCockpitModule { }
