import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { CoreModule } from 'app/core/core.module';
import { Subject } from 'rxjs';
import { PriceCalculatorService } from '../../sidenav/services/price-calculator.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';
import * as fromStore from '../../store/reducers';
import { FilterFormData } from '../components/menu-filters/menu-filters.component';
import { MenuService } from '../services/menu.service';
import { MenuComponent } from './menu.component';

export function mockStore<T>({
  actions = new Subject<Action>(),
  states = new Subject<T>(),
}: {
  actions?: Subject<Action>;
  states?: Subject<T>;
}): Store<T> {
  const result = states as any;
  result.dispatch = (action: Action) => actions.next(action);
  return result;
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let priceCalculatorService: PriceCalculatorService;
  const actions = new Subject<Action>();
  const states = new Subject<fromStore.State>();
  const store = mockStore<fromStore.State>({ actions, states });

  beforeEach(() => {
    const storeStub = {
      select: () => ({ subscribe: () => ({}) }),
      dispatch: () => ({}),
    };
    const menuServiceStub = {
      composeFilters: () => ({}),
      menuToOrder: () => ({ dish: { id: {} } }),
    };
    const sidenavServiceStub = { openSideNav: () => ({}) };
    const filterFormDataStub = { sort: { property: {}, direction: {} } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        CoreModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      declarations: [MenuComponent],
      providers: [
        PriceCalculatorService,
        { provide: Store, useValue: storeStub },
        { provide: MenuService, useValue: menuServiceStub },
        { provide: SidenavService, useValue: sidenavServiceStub },
        { provide: FilterFormData, useValue: filterFormDataStub },
      ],
    });

    priceCalculatorService = TestBed.get(PriceCalculatorService);
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('extras defaults to: []', () => {
    expect(component.extras).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      inject(
        [PriceCalculatorService],
        (_injectService: PriceCalculatorService) => {
          spyOn(store, 'select').and.callThrough();
          component.ngOnInit();
          expect(store.select).toHaveBeenCalled();
        },
      );
    });
  });
});
