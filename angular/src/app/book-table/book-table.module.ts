import { BookTableComponent } from './book-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { BookTableService } from './shared/book-table.service';
import { WindowService } from '../core/windowService/windowService.service';
import { SnackBarService } from '../core/snackService/snackService.service';

import { BookTableDialogComponent } from './book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule,
    CoreModule,
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
