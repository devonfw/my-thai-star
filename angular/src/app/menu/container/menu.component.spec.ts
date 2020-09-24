import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { menuDishes } from '../../../in-memory-test-data/db-menu-dish';
import { filteredMenuDishes } from '../../../in-memory-test-data/db-menu-dish.filter';
import * as uuid from 'uuid';
import * as fromApp from '../../../app/store/reducers';
import { CoreModule } from '../../core/core.module';
import { PriceCalculatorService } from '../../sidenav/services/price-calculator.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';
import { getTranslocoModule } from '../../transloco-testing.module';
import { MenuCardDetailsComponent } from '../components/menu-card/menu-card-details/menu-card-details.component';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';
import { MenuService } from '../services/menu.service';
import { MenuComponent } from './menu.component';

const mockFilterValue = {
  searchBy: 'fried',
  sort: {
    property: 'price',
    direction: 'DESC',
  },
  maxPrice: null,
  minLikes: null,
  categories: {
    mainDishes: false,
    starters: false,
    desserts: false,
    noodle: false,
    rice: true,
    curry: false,
    vegan: false,
    vegetarian: false,
    favourites: false,
  },
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
  }),
  composeFilters: jasmine
    .createSpy('composeFilters')
    .and.returnValue(filteredMenuDishes),
};

const sidenavServiceStub = {
  openSideNav: jasmine.createSpy('openSideNav'),
};

const STATE = {
  menu: {
    menu: {
      loading: true,
      loaded: true,
      dishes: menuDishes.content as any[],
      errorMessage: '',
    },
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
        error: '',
      },
    },
  },
  auth: {
    error: null,
    text: null,
    user: null,
    token: {
      token: '',
    },
  },
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
      imports: [CoreModule, getTranslocoModule()],
      declarations: [
        MenuComponent,
        MenuCardComponent,
        MenuCardDetailsComponent,
      ],
      providers: [
        PriceCalculatorService,
        { provide: SidenavService, useValue: sidenavServiceStub },
        { provide: MenuService, useValue: menuServiceStub },
        provideMockStore({ initialState: STATE }),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    priceCalculatorService = TestBed.inject(PriceCalculatorService);
    sidenavService = TestBed.inject(SidenavService);
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
