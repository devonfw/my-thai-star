import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCardComponent } from './home-card.component';
import { CoreModule } from '../../core/core.module';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeCardComponent', () => {
  let component: HomeCardComponent;
  let fixture: ComponentFixture<HomeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCardComponent],
      imports: [CoreModule, TranslateModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardComponent);
    component = fixture.componentInstance;
    component.tile = {
      titleKey: 'test',
      contentKey: 'test',
      img: 'test',
      buttonLabelKey: 'test',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
