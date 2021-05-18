import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../../core/core.module';
import { WaiterCockpitModule } from '../../cockpit.module';
import { AdminService } from '../../services/admin.service';
import { RegisterDialogComponent } from './register-dialog.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../../core/config/config.service';
import { config } from '../../../core/config/config';
import { getTranslocoModule } from '../../../transloco-testing.module';

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let dialog: MatDialog;
  let initialState;
  let message;
  beforeEach(async(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [
        AdminService,
        provideMockStore({ initialState }),
        ConfigService,
        HttpClient,
      ],
      imports: [
        BrowserAnimationsModule,
        WaiterCockpitModule,
        getTranslocoModule(),
        CoreModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
  
    dialog = TestBed.inject(MatDialog);
    component = dialog.open(RegisterDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 /*  it('should create', () => {
    message = {   modificationCounter: 0,
    id: 0,
    username: 'testUser',
    email: 'testUser@test.com',
    twoFactorStatus: false,
    userRoleId: 0
    }
    component.openSuccessBar(message);
    expect(component).toBeTruthy();
  }); */
});

