import { BookTablePageComponent } from './container/book-table-page/book-table-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { BookTableService } from './services/book-table.service';
import { WindowService } from '../core/window/window.service';
import { SnackBarService } from '../core/snack-bar/snack-bar.service';

import { BookTableDialogComponent } from './components/book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './components/invitation-dialog/invitation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {BookTableEffects} from './store/effects/book-table.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import { BookTableFormComponent } from './components/book-table-form/book-table-form.component';
import { InviteFriendsFormComponent } from './components/invite-friends-form/invite-friends-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule,
    CoreModule,
    EffectsModule.forFeature([BookTableEffects]),
    StoreModule.forFeature('bookings', reducers),
  ],
  providers: [
    BookTableService,
    WindowService,
    SnackBarService,
  ],
  declarations: [
    InvitationDialogComponent,
    BookTableDialogComponent,
    BookTablePageComponent,
    BookTableFormComponent,
    InviteFriendsFormComponent,
  ],
  exports: [BookTablePageComponent],
  entryComponents: [
    InvitationDialogComponent,
    BookTableDialogComponent,
  ],
})
export class BookTableModule {}
