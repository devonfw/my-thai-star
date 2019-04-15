import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../core/core.module';

import { SnackBarService } from '../core/snack-bar/snack-bar.service';
import { EmailConfirmationsService } from './services/email-confirmations.service';

import { EmailConfirmationsComponent } from './email-confirmations.component';
import { HomeComponent } from '../home/container/home/home.component';
import { MenuComponent } from '../menu/container/menu/menu.component';
import { BookTableFormComponent } from '../book-table/components/book-table-form/book-table-form.component';
import { OrderCockpitComponent } from '../cockpit-area/order-cockpit/order-cockpit.component';
import { ReservationCockpitComponent } from '../cockpit-area/reservation-cockpit/reservation-cockpit.component';
import { MenuCardComponent } from '../menu/components/menu-card/menu-card.component';
import { HomeCardComponent } from '../home/components/home-card/home-card.component';
import { HomeLayoutComponent } from '../home/components/home-layout/home-layout.component';
import { MenuFiltersComponent } from '../menu/components/menu-filters/menu-filters.component';
import { MenuCardCommentsComponent } from '../menu/components/menu-card/menu-card-comments/menu-card-comments.component';
import { MenuCardDetailsComponent } from '../menu/components/menu-card/menu-card-details/menu-card-details.component';
import { FilterSearchComponent } from '../menu/components/menu-filters/filter-search/filter-search.component';
import { FilterCheckboxesComponent } from '../menu/components/menu-filters/filter-checkboxes/filter-checkboxes.component';
import { FilterSortComponent } from '../menu/components/menu-filters/filter-sort/filter-sort.component';

describe('EmailConfirmationsComponent', () => {
  let component: EmailConfirmationsComponent;
  let fixture: ComponentFixture<EmailConfirmationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmailConfirmationsComponent,
        HomeComponent,
        MenuComponent,
        BookTableFormComponent,
        OrderCockpitComponent,
        ReservationCockpitComponent,
        MenuCardComponent,
        HomeCardComponent,
        HomeLayoutComponent,
        MenuFiltersComponent,
        MenuCardCommentsComponent,
        MenuCardDetailsComponent,
        FilterSearchComponent,
        FilterCheckboxesComponent,
        FilterSortComponent,
      ],
      providers: [SnackBarService, EmailConfirmationsService],
      imports: [
        AppRoutingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
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
