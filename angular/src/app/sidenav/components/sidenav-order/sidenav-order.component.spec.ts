import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import * as fromRoot from '../../../store/reducers';
import { SidenavOrderComponent } from './sidenav-order.component';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { By } from '@angular/platform-browser';
import { getAllOrderData } from '../../../../in-memory-test-data/db-order-data';
import { click } from '../../../shared/common/test-utils';
import { of } from 'rxjs';

describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;
  let el: DebugElement;
  let dialog: MatDialog;

  beforeEach(() => {
    const matDialogStub = {
      open: () => ({
        afterClosed: () => of('confirm'),
      }),
    };
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        getTranslocoModule(),
        RouterTestingModule,
        CoreModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromRoot.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidenavOrderComponent],
      providers: [{ provide: MatDialog, useValue: matDialogStub }],
    });
    fixture = TestBed.createComponent(SidenavOrderComponent);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.order = getAllOrderData[0];
    fixture.detectChanges();
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should emit order details to update order on click of increaseOrder button', () => {
    component.orderIncreased.subscribe((order) => {
      expect(order).toEqual(getAllOrderData[0]);
    });
    const elem = el.query(By.css('.increaseOrder'));
    click(elem);
  });

  it('should emit order details to cut down the orders on click of decreaseOrder button', () => {
    component.orderDecreased.subscribe((order) => {
      expect(order).toEqual(getAllOrderData[0]);
    });
    const elem = el.query(By.css('.decreaseOrder'));
    click(elem);
  });

  it('should clear order details on click of removeOrderBtn button', () => {
    component.orderRemoved.subscribe((order) => {
      expect(order).toEqual(getAllOrderData[0]);
    });
    const elem = el.query(By.css('.removeOrderBtn'));
    click(elem);
  });

  it('makes expected calls', () => {
    component.orderIncreased.subscribe((order) => {
      expect(order).toEqual(getAllOrderData[0]);
    });
    const elem = el.query(By.css('.increaseOrder'));
    click(elem);
  });

  it('should remove comment on click of removeOrderComment button', () => {
    component.commentRemoved.subscribe((order) => {
      expect(order).toEqual(getAllOrderData[0]);
    });
    const elem = el.query(By.css('.removeOrderComment'));
    click(elem);
  });

  it('should add the commits on click of addOrderComment button', () => {
    spyOn(dialog, 'open').and.callThrough();
    getAllOrderData[0].details.orderLine.comment = '';
    fixture.detectChanges();
    component.commentAdded.subscribe((order) => {
      expect(order).toBeTruthy();
      getAllOrderData[0].details.orderLine.comment = 'test';
    });
    const elem = el.query(By.css('.addOrderComment'));
    click(elem);
    expect(dialog.open).toHaveBeenCalled();
  });

  describe('addComment', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog,
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.addComment();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});
