import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../../core/core.module';
import { SidenavService } from '../../../sidenav/services/sidenav.service';

import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { BookTableService } from '../../services/book-table.service';
import { WindowService } from '../../../core/window/window.service';

import { BookTableComponent } from './book-table.component';
import {
  emailValidator,
  EmailValidatorDirective,
} from '../../../shared/directives/email-validator.directive';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { getTranslocoModule } from '../../../transloco-testing.module';

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookTableComponent, EmailValidatorDirective],
      providers: [
        SidenavService,
        SnackBarService,
        WindowService,
        BookTableService,
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        getTranslocoModule(),
        CoreModule,
      ],
    }).compileComponents();
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
    expect(emailValidator(new FormControl('bad@email').value)).toEqual(false);
    expect(emailValidator(new FormControl('good@email.com').value)).toEqual(
      true,
    );
  });
});
