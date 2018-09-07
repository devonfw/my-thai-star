import { HttpClient, HttpClientModule } from '@angular/common/http';
import { /* ComponentFixture, */ TestBed, async } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidenavService } from '../sidenav/shared/sidenav.service';
import { MenuService } from './shared/menu.service';
import { SnackBarService } from '../core/snackService/snackService.service';
import { AuthService } from '../core/authentication/auth.service';
import { MatSlider, MatInput } from '@angular/material';

import { MenuComponent } from './menu.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuFiltersComponent } from './menu-filters/menu-filters.component';
import { FilterSearchComponent } from './menu-filters/filter-search/filter-search.component';
import { FilterCheckboxesComponent } from './menu-filters/filter-checkboxes/filter-checkboxes.component';
import { FilterSortComponent } from './menu-filters/filter-sort/filter-sort.component';
import { MenuCardCommentsComponent } from './menu-card/menu-card-comments/menu-card-comments.component';
import { MenuCardDetailsComponent } from './menu-card/menu-card-details/menu-card-details.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  // let fixture: ComponentFixture<MenuComponent>;
  let http: HttpClient;
  let menuService: MenuService;

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
    menuService = new MenuService(http);
    component = new MenuComponent(menuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
