import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStateViewComponent } from './order-state-view/order-state-view.component';
import {MatStepperModule} from "@angular/material/stepper"
import {MatCardModule} from "@angular/material/card"
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [OrderStateViewComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatCardModule,
    TranslocoModule
  ]
})
export class OrderStateViewModule { }
