import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { BookTableModule } from '../../book-table.module';
import { BookTableService } from '../../services/book-table.service';
import * as fromRoot from '../../store/reducers';
import { InvitationDialogComponent } from './invitation-dialog.component';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InvitationDialogComponentStub } from '../../../../in-memory-test-data/db-invitation';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

describe('InvitationDialogComponent', () => {
  let component: InvitationDialogComponent;
  let dialog: MatDialog;
  let fixture: ComponentFixture<InvitationDialogComponent>;
  let el: DebugElement;
  let bookTableService: any;
  let mockStore: MockStore;
  const initialState = { booking: undefined };

  beforeEach(waitForAsync(() => {
    const bookTableServiceSpy = jasmine.createSpyObj('BookTableService', [
      'composeBooking',
      'postBooking',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: BookTableService, useValue: bookTableServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
        provideMockStore(),
      ],
      imports: [
        BrowserAnimationsModule,
        getTranslocoModule(),
        BookTableModule,
        HttpClientTestingModule,
        RouterTestingModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(InvitationDialogComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        bookTableService = TestBed.inject(BookTableService);
        mockStore = TestBed.inject(MockStore);
      });
  }));

  it('should create', () => {
    dialog = TestBed.inject(MatDialog);
    component = dialog.open(InvitationDialogComponent).componentInstance;
    component.data = InvitationDialogComponentStub.data;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should verify dialog name property value', () => {
    component.data = InvitationDialogComponentStub.data;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const name = el.queryAll(By.css('.nameValue'));
    const email = el.queryAll(By.css('.emailValue'));
    expect(name[0].nativeElement.textContent).toBe('test');
    expect(email[0].nativeElement.textContent).toBe('test@gmail.com');
  });

  it('Should send invitation', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const dialogRef = TestBed.inject(MatDialogRef);
    component.data = InvitationDialogComponentStub.data;
    bookTableService.composeBooking.and.returnValue(component.data);
    bookTableService.postBooking.and.returnValue(
      of(InvitationDialogComponentStub.invite),
    );
    component.sendInvitation();
    expect(dialogRef.close).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
