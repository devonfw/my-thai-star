import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCheckboxesComponent } from './filter-checkboxes.component';

describe('FilterCheckboxesComponent', () => {
  let component: FilterCheckboxesComponent;
  let fixture: ComponentFixture<FilterCheckboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCheckboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
