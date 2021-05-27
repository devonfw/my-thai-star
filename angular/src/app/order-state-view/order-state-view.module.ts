import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStateViewComponent } from './order-state-view/order-state-view.component';
import {MatStepperModule} from "@angular/material/stepper"
import {MatCardModule} from "@angular/material/card"
import { TranslocoModule } from '@ngneat/transloco';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [OrderStateViewComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatCardModule,
    TranslocoModule,
    MatTableModule,
    MatDividerModule
  ]
})
export class OrderStateViewModule { }
