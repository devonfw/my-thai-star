import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs';
import { CoreModule } from '../../core/core.module';
import { PriceCalculatorService } from '../../sidenav/services/price-calculator.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';
import * as fromStore from '../../store/reducers';
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

  beforeEach(() => {
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
      providers: [PriceCalculatorService, SidenavService, MenuService],
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
});
