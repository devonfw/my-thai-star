import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../core/core.module';

import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { WindowService } from '../../core/windowService/windowService.service';

import { ReservationCockpitComponent } from './reservation-cockpit.component';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';

describe('ReservationCockpitComponent', () => {
  let component: ReservationCockpitComponent;
  let fixture: ComponentFixture<ReservationCockpitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationCockpitComponent,
        ReservationDialogComponent,
      ],
      providers: [
        WindowService,
        WaiterCockpitService,
        PriceCalculatorService,
        HttpClient,
      ],
      imports: [
        CoreModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
