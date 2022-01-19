import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { WindowService } from '../core/window/window.service';
import { CommentAlertComponent } from './components/comment-alert/comment-alert.component';
import { CommentDialogComponent } from './components/comment-dialog/comment-dialog.component';
import { SidenavOrderComponent } from './components/sidenav-order/sidenav-order.component';
import { SidenavComponent } from './container/sidenav/sidenav.component';
import { SidenavService } from './services/sidenav.service';
import { SendOrderEffects } from './store/effects/send-order.effects';
import { reducers, effects } from './store';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        TranslocoModule,
        CoreModule,
        StoreModule.forFeature('sidenav', reducers),
        EffectsModule.forFeature(effects),
    ],
    providers: [SidenavService, WindowService],
    declarations: [
        SidenavComponent,
        SidenavOrderComponent,
        CommentDialogComponent,
        CommentAlertComponent,
    ],
    exports: [SidenavComponent]
})
export class SidenavModule {}
