import { BookTableComponent } from './book-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { BookTableService } from './services/book-table.service';
import { WindowService } from '../core/window/window.service';
import { SnackBarService } from '../core/snack-bar/snack-bar.service';

import { BookTableDialogComponent } from './book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromBookTable from './store/reducers/book-table.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookTableEffects } from './store/effects/book-table.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule,
    CoreModule,
    StoreModule.forFeature('bookTable', fromBookTable.reducer),
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
    BookTableComponent,
  ],
  exports: [BookTableComponent],
  entryComponents: [
    InvitationDialogComponent,
    BookTableDialogComponent,
  ],
})
export class BookTableModule {}
