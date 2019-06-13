import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSupportedComponent } from './not-supported.component';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { CovalentMediaModule, CovalentLayoutModule } from '@covalent/core';
import { CdkTableModule } from '@angular/cdk/table';

describe('NotSupportedComponent', () => {
  let component: NotSupportedComponent;
  let fixture: ComponentFixture<NotSupportedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSupportedComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        CovalentMediaModule,
        CovalentLayoutModule,
        CdkTableModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSupportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
