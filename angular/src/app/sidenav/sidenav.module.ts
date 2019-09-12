import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { SidenavService } from './services/sidenav.service';
import { PriceCalculatorService } from './services/price-calculator.service';
import { WindowService } from '../core/window/window.service';

import { SidenavComponent } from './container/sidenav/sidenav.component';
import { SidenavOrderComponent } from './components/sidenav-order/sidenav-order.component';
import { CommentDialogComponent } from './components/comment-dialog/comment-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CommentAlertComponent } from './components/comment-alert/comment-alert.component';
import { StoreModule } from '@ngrx/store';
import * as fromOrder from './store/reducers/order.reducer';
import * as fromSendOrder from './store/reducers/send-order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SendOrderEffects } from './store/effects/send-order.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    CoreModule,
    StoreModule.forFeature('order', fromOrder.reducer),
    StoreModule.forFeature('sendOrder', fromSendOrder.reducer),
    EffectsModule.forFeature([SendOrderEffects]),
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
    CommentAlertComponent,
  ],
  exports: [
    SidenavComponent,
  ],
  entryComponents: [
    CommentDialogComponent,
    CommentAlertComponent,
  ],
})
export class SidenavModule { }
