import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { MomentModule } from 'angular2-moment';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { WindowService } from '../../core/windowService/windowService.service';
import { MatDialog } from '@angular/material';

import { ReservationCockpitComponent } from './reservation-cockpit.component';

describe('ReservationCockpitComponent', () => {
  let component: ReservationCockpitComponent;
  let fixture: ComponentFixture<ReservationCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationCockpitComponent,
      ],
      providers: [
        WindowService,
        WaiterCockpitService,
        PriceCalculatorService,
        HttpClient,
        MatDialog,
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        MomentModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
