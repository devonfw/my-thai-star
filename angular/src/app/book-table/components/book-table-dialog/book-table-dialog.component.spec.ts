import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import * as fromStore from '../../../store/reducers';
import { BookTableDialogComponent } from './book-table-dialog.component';

describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookTableDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    component = dialog.open(BookTableDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
