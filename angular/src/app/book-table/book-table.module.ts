import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../core/core.module';
import { SnackBarService } from '../core/snack-bar/snack-bar.service';
import { WindowService } from '../core/window/window.service';
import { SharedModule } from '../shared/shared.module';
import { BookTableDialogComponent } from './components/book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './components/invitation-dialog/invitation-dialog.component';
import { BookTableComponent } from './container/book-table/book-table.component';
import { BookTableService } from './services/book-table.service';
import { BookTableEffects } from './store/effects/book-table.effects';
import * as fromBookTable from './store/reducers/book-table.reducer';

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
  providers: [BookTableService, WindowService, SnackBarService],
  declarations: [
    InvitationDialogComponent,
    BookTableComponent,
    BookTableDialogComponent,
  ],
  exports: [BookTableComponent],
  entryComponents: [InvitationDialogComponent, BookTableDialogComponent],
})
export class BookTableModule {}
