import { WindowService } from '../shared/windowService/windowService.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SidenavService } from './shared/sidenav.service';
import { PriceCalculatorService } from './shared/price-calculator.service';
import { SidenavComponent } from './sidenav.component';
import { SidenavOrderComponent } from './sidenav-order/sidenav-order.component';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [
    SidenavService,
    PriceCalculatorService,
    WindowService,
  ],
  declarations: [
    SidenavComponent,
    SidenavOrderComponent,
    CommentDialogComponent,
  ],
  exports: [
    SidenavComponent,
  ],
  entryComponents: [
    CommentDialogComponent,
  ],
})
export class SidenavModule { }
