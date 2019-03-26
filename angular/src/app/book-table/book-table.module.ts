import { BookTableFormComponent } from './components/book-table-form/book-table-form.component';
import { BookTableComponent } from './container/book-table/book-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { BookTableService } from './shared/book-table.service';
import { WindowService } from '../core/window/window.service';
import { SnackBarService } from '../core/snack-bar/snack-bar.service';

import { BookTableDialogComponent } from './container/book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './container/invitation-dialog/invitation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { InviteFriendsFormComponent } from './components/invite-friends-form/invite-friends-form.component';
import * as fromBookings from 'app/book-table/store/reducers';
import {StoreModule} from '@ngrx/store';
import {BookTableEffects} from './store/effects/book-table.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule,
    CoreModule,
    StoreModule.forFeature('bookings', fromBookings.reducers),
    EffectsModule.forFeature([BookTableEffects]),
  ],
  providers: [
    BookTableService,
    WindowService,
    SnackBarService,
  ],
  declarations: [
    InvitationDialogComponent,
    BookTableDialogComponent,
    BookTableFormComponent,
    BookTableComponent,
    InviteFriendsFormComponent,
  ],
  exports: [BookTableComponent],
  entryComponents: [
    InvitationDialogComponent,
    BookTableDialogComponent,
  ],
})
export class BookTableModule {}
