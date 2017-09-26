import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { MdCardModule, MdButtonModule, MdIconModule } from '@angular/material';
import { CovalentMediaModule, CovalentLayoutModule } from '@covalent/core';
import { CdkTableModule } from '@angular/cdk';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      imports: [
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        CovalentMediaModule,
        CovalentLayoutModule,
        CdkTableModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
