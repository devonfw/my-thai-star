import { BookTableComponent } from './book-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';
import { CoreModule } from '../core/core.module';
import { Md2Module } from 'md2';

import { BookTableService } from './shared/book-table.service';
import { AssistantsValidatorDirective } from './shared/assistant-validator.directive';
import { EmailValidatorDirective } from './shared/email-validator.directive';
import { WindowService } from '../shared/windowService/windowService.service';
import { SnackBarService } from '../shared/snackService/snackService.service';

import { BookTableDialogComponent } from './book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    Md2Module,
    MaterialModule,
    CoreModule,
  ],
  providers: [
    BookTableService,
    WindowService,
    SnackBarService,
  ],
  declarations: [
    EmailValidatorDirective,
    AssistantsValidatorDirective,
    InvitationDialogComponent,
    BookTableDialogComponent,
    BookTableComponent,
  ],
  exports: [
    BookTableComponent,
  ],
  entryComponents: [
    InvitationDialogComponent,
    BookTableDialogComponent,
  ],
})
export class BookTableModule { }
