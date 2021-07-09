import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import * as fromStore from '../../../store/reducers';
import { BookTableDialogComponent } from './book-table-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { By } from '@angular/platform-browser';
import { BookTableService } from '../../services/book-table.service';
import { of } from 'rxjs/internal/observable/of';
import { BookTableDialogComponentStub } from '../../../../in-memory-test-data/db-book';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let dialog: MatDialog;
  let fixture: ComponentFixture<BookTableDialogComponent>;
  let el: DebugElement;
  let bookTableService: any;

  beforeEach(waitForAsync(() => {
    const bookTableServiceSpy = jasmine.createSpyObj('BookTableService', [
      'composeBooking',
      'postBooking',
    ]);
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookTableDialogComponent],
      providers: [
        { provide: BookTableService, useValue: bookTableServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
      imports: [
        CoreModule,
        BrowserAnimationsModule,
        getTranslocoModule(),
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
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BookTableDialogComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        bookTableService = TestBed.inject(BookTableService);
      });
  }));

  it('should create', () => {
    dialog = TestBed.inject(MatDialog);
    component = dialog.open(BookTableDialogComponent).componentInstance;
    component.data = BookTableDialogComponentStub.data;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should verify dialog name property value', () => {
    component.data = BookTableDialogComponentStub.data;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const name = el.queryAll(By.css('.nameValue'));
    const email = el.queryAll(By.css('.emailValue'));
    expect(name[0].nativeElement.textContent).toBe('test');
    expect(email[0].nativeElement.textContent).toBe('test@gmail.com');
  });

  it('Should send booking invitation', () => {
    const dialogRef = TestBed.inject(MatDialogRef);
    bookTableService.postBooking.and.returnValue(
      of(BookTableDialogComponentStub.invite),
    );
    component.sendBooking();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
