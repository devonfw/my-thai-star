import { DebugElement } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, NgForm } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { Md2Module } from 'md2';
import { CovalentModule } from '../shared/covalent.module';
import { SidenavService } from '../sidenav/shared/sidenav.service';

import { SnackBarService } from '../shared/snackService/snackService.service';
import { BookingInMemoryService } from '../shared/backend/booking/booking-in-memory.service';
import { BookingDataService } from '../shared/backend/booking/booking-data-service';
import { BookTableService } from './shared/book-table.service';
import { WindowService } from '../shared/windowService/windowService.service';

import { BookTableComponent } from './book-table.component';
import { emailValidator, EmailValidatorDirective } from './shared/email-validator.directive';

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableComponent, EmailValidatorDirective ],
      providers: [
        SidenavService,
        SnackBarService,
        WindowService,
        BookTableService,
        {provide: BookingDataService, useClass: BookingInMemoryService},
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        CovalentModule,
        Md2Module,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Email should validate (easy)', () => {
    expect(emailValidator(new FormControl('bad@email'))).toEqual(false);
    expect(emailValidator(new FormControl('good@email.com'))).toEqual(true);
  });
});
