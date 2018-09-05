import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLayoutComponent } from './home-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../core/core.module';

describe('HomeLayoutComponent', () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeLayoutComponent],
      imports: [CoreModule, TranslateModule.forRoot()],
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
