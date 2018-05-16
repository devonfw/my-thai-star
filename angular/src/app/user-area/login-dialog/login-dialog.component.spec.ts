import { UserAreaModule } from '../user-area.module';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';

import { CoreModule } from '../../core/core.module';

import { LoginDialogComponent } from './login-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        UserAreaModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    component = dialog.open(LoginDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
