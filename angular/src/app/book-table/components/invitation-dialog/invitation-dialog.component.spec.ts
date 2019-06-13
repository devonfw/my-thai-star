import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { InvitationDialogComponent } from './invitation-dialog.component';
import { SnackBarService } from 'app/core/snack-bar/snack-bar.service';
import { BookTableService } from 'app/book-table/services/book-table.service';
import { BookTableModule } from 'app/book-table/book-table.module';

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
