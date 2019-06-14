import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { MenuService } from '../services/menu.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';
import { FilterFormData } from '../components/menu-filters/menu-filters.component';
import { MenuComponent } from './menu.component';
import { Subject } from 'rxjs';
import * as fromStore from 'app/store/reducers';

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
  const actions = new Subject<Action>();
  const states = new Subject<fromStore.State>();
  const store = mockStore<fromStore.State>({ actions, states });

  beforeEach(() => {
    const extraViewStub = {};
    const storeStub = {
      select: (arg1) => ({ subscribe: () => ({}) }),
      dispatch: (arg1) => ({}),
    };
    const menuServiceStub = {
      composeFilters: (pageable1, filters2) => ({}),
      menuToOrder: (order1) => ({ dish: { id: {} } }),
    };
    const sidenavServiceStub = { openSideNav: () => ({}) };
    const filterFormDataStub = { sort: { property: {}, direction: {} } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuComponent],
      providers: [
        { provide: Store, useValue: storeStub },
        { provide: MenuService, useValue: menuServiceStub },
        { provide: SidenavService, useValue: sidenavServiceStub },
        { provide: FilterFormData, useValue: filterFormDataStub },
      ],
    });
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
      spyOn(store, 'select').and.callThrough();
      component.ngOnInit();
      expect(store.select).toHaveBeenCalled();
    });
  });
});
