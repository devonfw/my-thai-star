import * as uuid from 'uuid';
import { NO_ERRORS_SCHEMA, DebugElement, Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Subject, of } from 'rxjs';
import { CoreModule } from '../../core/core.module';
import { PriceCalculatorService } from '../../sidenav/services/price-calculator.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';
import * as fromStore from '../../store/reducers';
import { MenuService } from '../services/menu.service';
import { MenuComponent } from './menu.component';
import { By } from '@angular/platform-browser';
import { click } from '../../shared/common/test-utils';
import { menuDishes } from 'in-memory-test-data/db-menu-dish';
import { DishView } from '../../shared/view-models/interfaces';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';
import { MenuCardDetailsComponent } from '../components/menu-card/menu-card-details/menu-card-details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthState } from '../../user-area/store/reducers/auth.reducer';
import * as fromSideNavState from '../../sidenav/store/reducers';
import * as fromMenu from '../../menu/store/reducers';
import * as fromApp from '../../../app/store/reducers';
import { getTranslocoModule } from '../../transloco-testing.module';
import { filteredMenuDishes } from 'in-memory-test-data/db-menu-dish.filter';

const mockFilterValue = {
  'searchBy': 'fried',
  'sort': {
    'property': 'price',
    'direction': 'DESC'
  },
  'maxPrice': null,
  'minLikes': null,
  'categories': {
    'mainDishes': false,
    'starters': false,
    'desserts': false,
    'noodle': false,
    'rice': true,
    'curry': false,
    'vegan': false,
    'vegetarian': false,
    'favourites': false
  }
};

const menuServiceStub = {
  getDishes: jasmine.createSpy('getDishes').and.returnValue(menuDishes),
  menuToOrder: jasmine.createSpy('menuToOrder').and.returnValue({
    id: uuid.v4(),
      details: {
        dish: menuDishes.content[0].dish,
        extras: menuDishes.content[0].extras,
        orderLine: {
          amount: 1,
          comment: '',
        },
      },
    },
  ),
  composeFilters: jasmine.createSpy('composeFilters').and.returnValue(filteredMenuDishes)
};

const sidenavServiceStub = {
  openSideNav: jasmine.createSpy('openSideNav')
};

const STATE = {
  menu: {
    menu: {
      loading: true,
      loaded: true,
      dishes: menuDishes['content'] as any[],
      errorMessage: ''
    }
  },
  sidenav: {
    order: {
      ids: [],
      entities: {},
      selectedOrderId: null,
      errorMessage: '',
      orderSend: {
        token: '',
        orderSent: false,
        error: ''
      }
    }
  },
  auth: {
    error: null,
    text: null,
    user: {
      user: '',
      role: 'CUSTOMER',
      logged: true,
    },
    token: {
      token: '',
    }
  }
};

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let priceCalculatorService: PriceCalculatorService;
  let el: DebugElement;
  let mockStore: MockStore<fromApp.State>;
  let sidenavService: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        CoreModule,
        getTranslocoModule()
      ],
      declarations: [
        MenuComponent, MenuCardComponent, MenuCardDetailsComponent
      ],
      providers: [
        PriceCalculatorService,
        { provide: SidenavService, useValue: sidenavServiceStub },
        { provide: MenuService, useValue: menuServiceStub },
        provideMockStore({ initialState: STATE }),
      ],
    }).compileComponents();

    mockStore = TestBed.get(Store);
    priceCalculatorService = TestBed.get(PriceCalculatorService);
    sidenavService = TestBed.get(SidenavService);
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('can load instance and verify the dishes', () => {
    expect(component).toBeTruthy();
    component.dishes$.subscribe(dishes => {
      expect(dishes.length).toBe(7);
    });
  });

  it('extras defaults to: []', () => {
    expect(component.extras).toEqual([]);
  });

  it('should update dish with extra curry', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const ele = el.queryAll(By.css('.extras .mat-checkbox label'));
    click(ele[1].nativeElement);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should dished', () => {
    const ele = el.queryAll(By.css('.addOrder'));
    click(ele[0]);
    expect(sidenavService.openSideNav).toHaveBeenCalled();
  });

  it('should update dish by applying filter', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    component.onFilterChange(mockFilterValue);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
