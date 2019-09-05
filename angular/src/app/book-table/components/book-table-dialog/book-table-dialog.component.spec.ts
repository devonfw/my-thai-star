import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { BookTableDialogComponent } from './book-table-dialog.component';
import { SnackBarService } from 'app/core/snack-bar/snack-bar.service';
import { BookTableService } from 'app/book-table/services/book-table.service';
import { BookTableModule } from 'app/book-table/book-table.module';
import { CoreModule } from 'app/core/core.module';

describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarService, BookTableService, HttpClient],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        BookTableModule,
        HttpClientModule,
        CoreModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    component = dialog.open(BookTableDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
