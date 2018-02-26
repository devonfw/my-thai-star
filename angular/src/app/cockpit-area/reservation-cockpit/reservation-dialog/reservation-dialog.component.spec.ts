import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';

import { WaiterCockpitModule } from '../../cockpit.module';
import { CoreModule } from '../../../core/core.module';

import { PriceCalculatorService } from '../../../sidenav/shared/price-calculator.service';
import { WaiterCockpitService } from '../../shared/waiter-cockpit.service';

import { ReservationDialogComponent } from './reservation-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ReservationDialogComponent', () => {
  let component: ReservationDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [WaiterCockpitService, PriceCalculatorService, HttpClient],
      imports: [
        BrowserAnimationsModule,
        WaiterCockpitModule,
        TranslateModule.forRoot(),
        CoreModule,
        HttpClientModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    component = dialog.open(ReservationDialogComponent, { data: { dialogData: { row: undefined } } }).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
