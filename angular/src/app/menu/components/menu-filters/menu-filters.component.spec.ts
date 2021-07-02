import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { MenuFiltersComponent } from './menu-filters.component';
import { FilterSortComponent } from './filter-sort/filter-sort.component';
import { FilterCheckboxesComponent } from './filter-checkboxes/filter-checkboxes.component';
import { FilterSearchComponent } from './filter-search/filter-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../core/core.module';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { click } from '../../../shared/common/test-utils';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MenuFiltersComponent', () => {
  let component: MenuFiltersComponent;
  let fixture: ComponentFixture<MenuFiltersComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuFiltersComponent,
        FilterSortComponent,
        FilterCheckboxesComponent,
        FilterSearchComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        getTranslocoModule(),
        CoreModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFiltersComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filter data by applying filter', () => {
    component.applyForm.subscribe(form => {
      expect(form).toBeTruthy();
    });
    component.applyFilters();
  });

  it('should call clear filter', () => {
    component.applyForm.subscribe(form => {
      expect(form).toBeTruthy();
    });
    const clearButton = el.query(By.css('.clearFilter'));
    clearButton.nativeElement.click();
  });
});
