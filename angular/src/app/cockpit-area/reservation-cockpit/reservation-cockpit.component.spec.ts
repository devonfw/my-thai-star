import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentCoreModule } from '@covalent/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendModule } from '../../shared/backend/backend.module';
import { ReservationCockpitComponent } from './reservation-cockpit.component';
import { ReservationCockpitService } from './shared/reservation-cockpit.service';

describe('ReservationCockpitComponent', () => {
  let component: ReservationCockpitComponent;
  let fixture: ComponentFixture<ReservationCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCockpitComponent ],
      providers: [  ReservationCockpitService ],
      imports: [
        CovalentCoreModule.forRoot(),
        BackendModule.forRoot({environmentType: 0, restServiceRoot: 'v1'}),
        BrowserAnimationsModule,
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
