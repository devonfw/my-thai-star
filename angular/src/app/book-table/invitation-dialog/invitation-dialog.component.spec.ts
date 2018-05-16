import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';

import { BookTableModule } from '../book-table.module';

import { BookTableService } from '../shared/book-table.service';
import { SnackBarService } from '../../core/snackService/snackService.service';

import { InvitationDialogComponent } from './invitation-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

describe('InvitationDialogComponent', () => {
  let component: InvitationDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarService, BookTableService, HttpClient],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        BookTableModule,
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    component = dialog.open(InvitationDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
