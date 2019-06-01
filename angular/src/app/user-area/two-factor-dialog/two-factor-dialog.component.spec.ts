import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorDialogComponent } from './two-factor-dialog.component';

describe('TwoFactorDialogComponent', () => {
  let component: TwoFactorDialogComponent;
  let fixture: ComponentFixture<TwoFactorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
