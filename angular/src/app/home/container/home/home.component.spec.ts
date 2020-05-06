import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import * as fromStore from '../../../store';
import { HomeCardComponent } from '../../components/home-card/home-card.component';
import { HomeLayoutComponent } from '../../components/home-layout/home-layout.component';
import { HomeComponent } from './home.component';
import { TranslocoRootModule } from '../../../transloco-root.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, HomeCardComponent, HomeLayoutComponent],
      imports: [
        TranslocoRootModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
