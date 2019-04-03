import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../../core/core.module';
import { SidenavService } from '../../../sidenav/services/sidenav.service';

import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { BookTableService } from '../../services/book-table.service';
import { WindowService } from '../../../core/window/window.service';

import { BookTablePageComponent } from './book-table-page.component';
import {
  emailValidator,
  EmailValidatorDirective,
} from '../../../shared/directives/email-validator.directive';
import { TranslateModule } from '@ngx-translate/core';

describe('BookTablePageComponent', () => {
  let component: BookTablePageComponent;
  let fixture: ComponentFixture<BookTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookTablePageComponent, EmailValidatorDirective],
      providers: [
        SidenavService,
        SnackBarService,
        WindowService,
        BookTableService,
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        CoreModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Email should validate (easy)', () => {
    expect(emailValidator(new FormControl('bad@email').value)).toEqual(false);
    expect(emailValidator(new FormControl('good@email.com').value)).toEqual(
      true,
    );
  });
});
