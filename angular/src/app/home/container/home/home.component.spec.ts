import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import * as fromStore from '../../../store';
import { HomeCardComponent } from '../../components/home-card/home-card.component';
import { HomeLayoutComponent } from '../../components/home-layout/home-layout.component';
import { HomeComponent } from './home.component';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click } from '../../../shared/common/test-utils';

const homeData = (component) => {
  return {
    restaurant: {
      titleKey: 'Our restaurant',
      contentKey: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      img: './assets/images/thai-restaurant.jpg',
      buttonLabelKey: 'Book Table',
      navigate: () => component.navigateTo('bookTable'),
    },
    menu: {
      titleKey: 'Our menu',
      contentKey: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      img: './assets/images/thai-restaurant-dish.jpg',
      buttonLabelKey: 'View Menu',
      navigate: () => component.navigateTo('menu'),
    },
  };
};

const mockStore = {
  dispatch: jasmine.createSpy('dispatch'),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, HomeCardComponent, HomeLayoutComponent],
      providers: [{ provide: Store, useValue: mockStore }],
      imports: [
        getTranslocoModule(),
        CoreModule,
        RouterTestingModule,
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
        EffectsModule.forRoot(fromStore.effects),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify the content', () => {
    component.tiles = homeData(component);
    fixture.detectChanges();
    const title = el.queryAll(By.css('.tile-content h3'));
    expect(title[0].nativeElement.textContent).toBe('Our restaurant');
    expect(title[1].nativeElement.textContent).toBe('Our menu');
  });

  it('should verify whether button event generate event', fakeAsync(() => {
    const store = TestBed.inject(Store);
    component.tiles = homeData(component);
    fixture.detectChanges();
    const action = el.query(By.css('.action'));
    click(action);
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalled();
  }));
});
