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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    CoreModule,
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
