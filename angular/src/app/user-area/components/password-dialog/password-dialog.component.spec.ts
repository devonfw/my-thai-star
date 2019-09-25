import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/authentication/auth.service';
import { CoreModule } from '../../../core/core.module';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import * as fromRoot from '../../store/reducers';
import { UserAreaModule } from '../../user-area.module';
import { PasswordDialogComponent } from './password-dialog.component';

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
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromRoot.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    component = dialog.open(PasswordDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
