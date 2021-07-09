import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';

import { HomeCardComponent } from './home-card.component';
import { CoreModule } from '../../../core/core.module';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click } from '../../../shared/common/test-utils';

describe('HomeCardComponent', () => {
  let component: HomeCardComponent;
  let fixture: ComponentFixture<HomeCardComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCardComponent],
      imports: [CoreModule, getTranslocoModule()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.tile = {
      titleKey: 'test',
      caption: 'test',
      contentKey: 'test',
      img: 'test',
      buttonLabelKey: 'test',
    };
    fixture.detectChanges();
  });

  it('should create and verify title', () => {
    const title = el.query(By.css('.tile-content h3'));
    expect(title.nativeElement.textContent).toBe('test');
    expect(component).toBeTruthy();
  });

  it('should verify whether button event emits button click event', () => {
    component.buttonClick.subscribe(event => {
      expect(event).toBeTruthy();
    });
    const action = el.query(By.css('.action'));
    click(action);
  });

});
