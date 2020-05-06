import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'app/core/core.module';
import * as fromStore from '../../../store/reducers';
import { BookTableDialogComponent } from './book-table-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TranslocoRootModule } from '../../../transloco-root.module';

describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookTableDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      imports: [
        CoreModule,
        BrowserAnimationsModule,
        TranslocoRootModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [BookTableDialogComponent] },
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
