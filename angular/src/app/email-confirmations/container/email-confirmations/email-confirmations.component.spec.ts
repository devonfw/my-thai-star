import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EmailConfirmationsComponent } from './email-confirmations.component';
import { HomeComponent } from '../../../home/container/home/home.component';
import { MenuComponent } from 'app/menu/container/menu.component';
import { BookTableComponent } from 'app/book-table/container/book-table/book-table.component';
import { OrderCockpitComponent } from 'app/cockpit-area/order-cockpit/order-cockpit.component';
import { PredictionCockpitComponent } from 'app/cockpit-area/prediction-cockpit/prediction-cockpit.component';
import { ReservationCockpitComponent } from 'app/cockpit-area/reservation-cockpit/reservation-cockpit.component';
import { MenuCardComponent } from 'app/menu/components/menu-card/menu-card.component';
import { HomeCardComponent } from '../../../home/components/home-card/home-card.component';
import { HomeLayoutComponent } from '../../../home/components/home-layout/home-layout.component';
import { MenuFiltersComponent } from 'app/menu/components/menu-filters/menu-filters.component';
import { MenuCardCommentsComponent } from 'app/menu/components/menu-card/menu-card-comments/menu-card-comments.component';
import { MenuCardDetailsComponent } from 'app/menu/components/menu-card/menu-card-details/menu-card-details.component';
import { FilterSearchComponent } from 'app/menu/components/menu-filters/filter-search/filter-search.component';
import { FilterCheckboxesComponent } from 'app/menu/components/menu-filters/filter-checkboxes/filter-checkboxes.component';
import { FilterSortComponent } from 'app/menu/components/menu-filters/filter-sort/filter-sort.component';
import { SnackBarService } from 'app/core/snack-bar/snack-bar.service';
import { EmailConfirmationsService } from 'app/email-confirmations/services/email-confirmations.service';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core/core.module';
import { config } from '../../../core/config/config';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../../core/config/config.service';

describe('EmailConfirmationsComponent', () => {
  let component: EmailConfirmationsComponent;
  let fixture: ComponentFixture<EmailConfirmationsComponent>;
  let initialState;

  beforeEach(async(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      declarations: [
        EmailConfirmationsComponent,
        HomeComponent,
        MenuComponent,
        BookTableComponent,
        OrderCockpitComponent,
        PredictionCockpitComponent,
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
      providers: [
        SnackBarService,
        EmailConfirmationsService,
        provideMockStore({ initialState }),
        ConfigService,
      ],
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
