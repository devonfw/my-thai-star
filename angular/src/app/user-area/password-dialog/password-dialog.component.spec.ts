import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialog } from '@angular/material';

import { UserAreaModule } from '../user-area.module';
import { CovalentModule } from '../../shared/covalent.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendModule } from '../../shared/backend/backend.module';

import { AuthService } from '../../shared/authentication/auth.service';
import { SnackBarService } from '../../shared/snackService/snackService.service';

import { PasswordDialogComponent } from './password-dialog.component';

describe('PasswordDialogComponent', () => {
  let component: PasswordDialogComponent;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ SnackBarService, AuthService ],
      imports: [
        CovalentModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        UserAreaModule,
        BackendModule.forRoot({environmentType: 0, restServiceRoot: 'v1'}),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    component = dialog.open(PasswordDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
