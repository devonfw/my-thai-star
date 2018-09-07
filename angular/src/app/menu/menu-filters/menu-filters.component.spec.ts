import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFiltersComponent } from './menu-filters.component';
import { FilterSortComponent } from './filter-sort/filter-sort.component';
import { FilterCheckboxesComponent } from './filter-checkboxes/filter-checkboxes.component';
import { FilterSearchComponent } from './filter-search/filter-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../core/core.module';

describe('MenuFiltersComponent', () => {
  let component: MenuFiltersComponent;
  let fixture: ComponentFixture<MenuFiltersComponent>;

  beforeEach(async(() => {
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
        TranslateModule.forRoot(),
        CoreModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
