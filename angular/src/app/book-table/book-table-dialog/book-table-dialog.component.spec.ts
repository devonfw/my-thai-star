import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovalentModule } from '../../shared/covalent.module';
import { BackendModule } from '../../shared/backend/backend.module';
import { BookTableModule } from '../book-table.module';

import { SnackBarService } from '../../shared/snackService/snackService.service';
import { BookTableService } from '../shared/book-table.service';
import { BookTableDialogComponent } from './book-table-dialog.component';
import { MdDialogModule, MdDialog } from '@angular/material';

describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarService, BookTableService],
      imports: [
        BrowserAnimationsModule,
        BookTableModule,
        BackendModule.forRoot({environmentType: 0, restServiceRoot: 'v1'}),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    component = dialog.open(BookTableDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
