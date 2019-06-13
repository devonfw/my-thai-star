import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Order } from 'app/sidenav/models/order.model';
import { TdDialogService } from '@covalent/core';
import { SidenavService } from '../../services/sidenav.service';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { SidenavComponent } from './sidenav.component';
describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  beforeEach(() => {
    const routerStub = { navigate: array1 => ({}) };
    const storeStub = { select: arg1 => ({}), dispatch: arg1 => ({}) };
    const orderStub = {
      order: {
        dish: { id: {} },
        orderLine: { amount: {}, comment: {} },
        extras: {}
      },
      id: {}
    };
    const tdDialogServiceStub = {};
    const sidenavServiceStub = {
      closeSideNav: () => ({}),
      sendOrders: bookingId1 => ({ subscribe: () => ({}) })
    };
    const snackBarServiceStub = {
      openSnack: (string1, number2, string3) => ({})
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidenavComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub },
        { provide: Order, useValue: orderStub },
        { provide: TdDialogService, useValue: tdDialogServiceStub },
        { provide: SidenavService, useValue: sidenavServiceStub },
        { provide: SnackBarService, useValue: snackBarServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('onOrderIncreased', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.onOrderIncreased(orderStub);
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
  describe('onOrderDecreased', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.onOrderDecreased(orderStub);
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
  describe('onOrderRemoved', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.onOrderRemoved(orderStub);
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
  describe('onCommentRemoved', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.onCommentRemoved(orderStub);
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
  describe('onCommentAdded', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.onCommentAdded(orderStub);
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'select').and.callThrough();
      component.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });
  describe('closeSidenav', () => {
    it('makes expected calls', () => {
      const sidenavServiceStub: SidenavService = fixture.debugElement.injector.get(
        SidenavService
      );
      spyOn(sidenavServiceStub, 'closeSideNav').and.callThrough();
      component.closeSidenav();
      expect(sidenavServiceStub.closeSideNav).toHaveBeenCalled();
    });
  });
});
