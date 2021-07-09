import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeLayoutComponent } from './home-layout.component';
import { CoreModule } from '../../../core/core.module';
import { getTranslocoModule } from '../../../transloco-testing.module';

describe('HomeLayoutComponent', () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeLayoutComponent],
      imports: [CoreModule, getTranslocoModule()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
