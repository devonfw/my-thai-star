import { HttpClient, HttpClientModule } from '@angular/common/http';
import { /* ComponentFixture, */ TestBed, async } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CoreModule } from '../../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidenavService } from '../../../sidenav/services/sidenav.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { MatSlider, MatInput } from '@angular/material';

import { MenuComponent } from './menu.component';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';
import { MenuFiltersComponent } from '../../components/menu-filters/menu-filters.component';
import { FilterSearchComponent } from '../../components/menu-filters/filter-search/filter-search.component';
import { FilterCheckboxesComponent } from '../../components/menu-filters/filter-checkboxes/filter-checkboxes.component';
import { FilterSortComponent } from '../../components/menu-filters/filter-sort/filter-sort.component';
import { MenuCardCommentsComponent } from '../../components/menu-card/menu-card-comments/menu-card-comments.component';
import { MenuCardDetailsComponent } from '../../components/menu-card/menu-card-details/menu-card-details.component';
import { TranslateModule } from '@ngx-translate/core';
import {MenuService} from '../../services/menu.service';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import {ConfigService} from '../../../core/config/config.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/reducers';
import * as fromOrder from '../../store/reducers/order.reducer';

describe('MenuComponent', () => {
  let component: MenuComponent;
  // let fixture: ComponentFixture<MenuComponent>;
  // tslint:disable-next-line:prefer-const
  let http: HttpClient;
  const configService: ConfigService = null;
  let menuService: MenuService;
  const store: Store<AppState> = null;
  const sidenav: SidenavService = null;
  const orderStore: Store<fromOrder.State> = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        MenuCardComponent,
        MenuFiltersComponent,
        MenuCardCommentsComponent,
        MenuCardDetailsComponent,
        FilterSearchComponent,
        FilterCheckboxesComponent,
        FilterSortComponent,
      ],
      providers: [
        HttpClient,
        SidenavService,
        MenuService,
        SnackBarService,
        AuthService,
        MatSlider,
        MatInput,
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        CoreModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(MenuComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    menuService = new MenuService(http, configService);
    component = new MenuComponent(
      store,
      menuService,
      sidenav,
      orderStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
