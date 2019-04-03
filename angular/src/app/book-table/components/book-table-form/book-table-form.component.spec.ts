import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTableFormComponent } from './book-table-form.component';

describe('BookTableFormComponent', () => {
  let component: BookTableFormComponent;
  let fixture: ComponentFixture<BookTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
