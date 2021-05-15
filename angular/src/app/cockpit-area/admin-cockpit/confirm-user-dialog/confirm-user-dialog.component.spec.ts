import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUserDialogComponent } from './confirm-user-dialog.component';

describe('ConfirmUserDialogComponent', () => {
  let component: ConfirmUserDialogComponent;
  let fixture: ComponentFixture<ConfirmUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
