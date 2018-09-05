import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterSortComponent, SortDirection } from './filter-sort.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../../core/core.module';

describe('FilterSortComponent', () => {
  let component: FilterSortComponent;
  let fixture: ComponentFixture<FilterSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSortComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        CoreModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSortComponent);
    component = fixture.componentInstance;
    component.sortValue = {
      name: 'test',
      direction: SortDirection.ASC,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
