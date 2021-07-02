import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterSearchComponent } from './filter-search.component';
import { CoreModule } from '../../../../core/core.module';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click } from '../../../../shared/common/test-utils';

describe('FilterSearchComponent', () => {
  let component: FilterSearchComponent;
  let fixture: ComponentFixture<FilterSearchComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSearchComponent],
      imports: [CoreModule, getTranslocoModule()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSearchComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear search filter', () => {
    component.updateForm = (val) => val;
    component.inputValue = 'test';
    fixture.detectChanges();
    const clearbtn = el.query(By.css('.clearSearchField'));
    click(clearbtn);
    expect(component.inputValue).toBe('');
  });
});
