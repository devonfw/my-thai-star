import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { SnackBarService } from '../core/snack-bar/snack-bar.service';
import { HomeComponent } from '../home/home.component';
import { PredictionCockpitComponent  } from '../cockpit-area/prediction-cockpit/prediction-cockpit.component';
import { OrderCockpitComponent } from '../cockpit-area/order-cockpit/order-cockpit.component';
import { ReservationCockpitComponent } from '../cockpit-area/reservation-cockpit/reservation-cockpit.component';
import { HomeCardComponent } from '../home/home-card/home-card.component';
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component';
import {EmailConfirmationsComponent} from './container/email-confirmations/email-confirmations.component';
import {MenuCardComponent} from '../menu/components/menu-card/menu-card.component';
import {FilterSortComponent} from '../menu/components/menu-filters/filter-sort/filter-sort.component';
import {BookTableComponent} from '../book-table/container/book-table/book-table.component';
import {MenuCardCommentsComponent} from '../menu/components/menu-card/menu-card-comments/menu-card-comments.component';
import {MenuCardDetailsComponent} from '../menu/components/menu-card/menu-card-details/menu-card-details.component';
import {FilterCheckboxesComponent} from '../menu/components/menu-filters/filter-checkboxes/filter-checkboxes.component';
import {MenuComponent} from '../menu/container/menu.component';
import {FilterSearchComponent} from '../menu/components/menu-filters/filter-search/filter-search.component';
import {EmailConfirmationsService} from './services/email-confirmations.service';
import {MenuFiltersComponent} from '../menu/components/menu-filters/menu-filters.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';


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
