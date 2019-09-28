import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../core/core.module';
import { WindowService } from '../core/window/window.service';
import { CommentAlertComponent } from './components/comment-alert/comment-alert.component';
import { CommentDialogComponent } from './components/comment-dialog/comment-dialog.component';
import { SidenavOrderComponent } from './components/sidenav-order/sidenav-order.component';
import { SidenavComponent } from './container/sidenav/sidenav.component';
import { SidenavService } from './services/sidenav.service';
import { SendOrderEffects } from './store/effects/send-order.effects';
import * as fromSideNav from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    CoreModule,
    StoreModule.forFeature('sidenav', fromSideNav.reducers),
    EffectsModule.forFeature([SendOrderEffects]),
  ],
  providers: [SidenavService, WindowService],
  declarations: [
    SidenavComponent,
    SidenavOrderComponent,
    CommentDialogComponent,
    CommentAlertComponent,
  ],
  exports: [SidenavComponent],
  entryComponents: [CommentDialogComponent, CommentAlertComponent],
})
export class SidenavModule {}
