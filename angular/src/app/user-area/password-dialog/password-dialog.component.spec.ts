import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';

import { UserAreaModule } from '../user-area.module';
import { CoreModule } from '../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../../core/authentication/auth.service';
import { SnackBarService } from '../../core/snackService/snackService.service';

import { PasswordDialogComponent } from './password-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PasswordDialogComponent', () => {
  let component: PasswordDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarService, AuthService, HttpClient],
      imports: [
        CoreModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        UserAreaModule,
        HttpClientModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    component = dialog.open(PasswordDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
