import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../app-routing.module';

import { CoreModule } from '../core/core.module';
import { SnackBarService } from '../core/snackService/snackService.service';
import { EmailConfirmationsService } from './shared/email-confirmations.service';

import { EmailConfirmationsComponent } from './email-confirmations.component';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { BookTableComponent } from '../book-table/book-table.component';
import { OrderCockpitComponent } from '../cockpit-area/order-cockpit/order-cockpit.component';
import { ReservationCockpitComponent } from '../cockpit-area/reservation-cockpit/reservation-cockpit.component';
import { MenuCardComponent } from '../menu/menu-card/menu-card.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('EmailConfirmationsComponent', () => {
  let component: EmailConfirmationsComponent;
  let fixture: ComponentFixture<EmailConfirmationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmailConfirmationsComponent,
        HomeComponent,
        MenuComponent,
        BookTableComponent,
        OrderCockpitComponent,
        ReservationCockpitComponent,
        MenuCardComponent,
      ],
      providers: [SnackBarService, EmailConfirmationsService],
      imports: [
        AppRoutingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CoreModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfirmationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
