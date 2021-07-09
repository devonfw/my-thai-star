import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoreModule } from '../../../../core/core.module';
import { MenuCardDetailsComponent } from './menu-card-details.component';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MenuCardDetailsComponent', () => {
  let component: MenuCardDetailsComponent;
  let fixture: ComponentFixture<MenuCardDetailsComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCardDetailsComponent],
      imports: [CoreModule, getTranslocoModule()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardDetailsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.menuInfo = {
      dish: { id: 0, name: 'test', description: 'test', price: 0 },
      image: { content: '' },
      extras: [],
      likes: 0,
      isfav: true,
      categories: [{ id: 'test' }],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
