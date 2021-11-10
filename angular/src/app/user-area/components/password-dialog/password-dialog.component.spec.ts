import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthService } from '../../../core/authentication/auth.service';
import { CoreModule } from '../../../core/core.module';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import * as fromRoot from '../../store/reducers';
import { UserAreaModule } from '../../user-area.module';
import { PasswordDialogComponent } from './password-dialog.component';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { UserAreaService } from '../../services/user-area.service';
import { FormGroup, FormControl } from '@angular/forms';

describe('PasswordDialogComponent', () => {
  let component: PasswordDialogComponent;
  let dialog: MatDialog;
  let userAreaService: UserAreaService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        SnackBarService,
        AuthService,
        HttpClient,
        {
          provide: UserAreaService,
          useValue: {
            changePassword: jasmine.createSpy('changePassword'),
          },
        },
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        getTranslocoModule(),
        UserAreaModule,
        HttpClientTestingModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.inject(MatDialog);
    userAreaService = TestBed.inject(UserAreaService);
    component = dialog.open(PasswordDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should comfirm', () => {
    const form = new FormGroup({
      oldPassword: new FormControl('capgemini'),
      newPassword: new FormControl('newCapgemini'),
      verifyPassword: new FormControl('newCapgemini'),
    });
    component.passwordSubmit(form);
    expect(userAreaService.changePassword).toHaveBeenCalled();
  });
});
