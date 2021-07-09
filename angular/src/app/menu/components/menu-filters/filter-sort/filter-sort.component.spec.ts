import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterSortComponent, SortDirection } from './filter-sort.component';
import { CoreModule } from '../../../../core/core.module';
import { getTranslocoModule } from '../../../../transloco-testing.module';

describe('FilterSortComponent', () => {
  let component: FilterSortComponent;
  let fixture: ComponentFixture<FilterSortComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSortComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        getTranslocoModule(),
        CoreModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSortComponent);
    component = fixture.componentInstance;
    component.sortValue = {
      property: 'test',
      direction: SortDirection.ASC,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
