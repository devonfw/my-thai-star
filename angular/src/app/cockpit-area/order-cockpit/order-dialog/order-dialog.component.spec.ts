import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../../core/core.module';
import { PriceCalculatorService } from '../../../sidenav/services/price-calculator.service';
import { WaiterCockpitModule } from '../../cockpit.module';
import { WaiterCockpitService } from '../../services/waiter-cockpit.service';
import { OrderDialogComponent } from './order-dialog.component';
import { ConfigService } from '../../../core/config/config.service';
import { provideMockStore } from '@ngrx/store/testing';
import { config } from '../../../core/config/config';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { dialogOrderDetails } from '../../../../in-memory-test-data/db-order-dialog-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('OrderDialogComponent', () => {
  let component: OrderDialogComponent;
  let fixture: ComponentFixture<OrderDialogComponent>;
  let initialState;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogOrderDetails },
        WaiterCockpitService,
        PriceCalculatorService,
        provideMockStore({ initialState }),
        ConfigService
      ],
      imports: [
        BrowserAnimationsModule,
        WaiterCockpitModule,
        getTranslocoModule(),
        CoreModule
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(OrderDialogComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    const name = el.query(By.css('.nameData'));
    const email = el.query(By.css('.emailData'));
    expect(email.nativeElement.textContent.trim()).toBe('user0@mail.com');
    expect(name.nativeElement.textContent.trim()).toBe('user0');
    expect(component).toBeTruthy();
    expect(component.datat[0].bookingToken).toEqual(dialogOrderDetails.booking.bookingToken);
  });
});
