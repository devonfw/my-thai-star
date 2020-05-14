import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchComponent } from './filter-search.component';
import { CoreModule } from '../../../../core/core.module';
import { TranslocoRootModule } from '../../../../transloco-root.module';
import { getTranslocoModule } from '../../../../transloco-testing.module';

describe('FilterSearchComponent', () => {
  let component: FilterSearchComponent;
  let fixture: ComponentFixture<FilterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSearchComponent],
      imports: [CoreModule, getTranslocoModule()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
