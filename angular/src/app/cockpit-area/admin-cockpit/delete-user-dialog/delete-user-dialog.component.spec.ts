import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../../core/core.module';
import { WaiterCockpitModule } from '../../cockpit.module';
import { AdminService } from '../../services/admin.service';
import { DeleteUserDialogComponent } from './delete-user-dialog.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../../core/config/config.service';
import { config } from '../../../core/config/config';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { UserInfo } from 'app/shared/backend-models/interfaces';

describe('DeleteUserDialogComponent', () => {
  let component: DeleteUserDialogComponent;
  let dialog: MatDialog;
  let initialState;
  let user: UserInfo;

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
    user = {     
      id: 0,
      email: 'test@Test.com',
      username: 'TestUser',
      roleId: 1};
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    dialog = TestBed.inject(MatDialog);
    component = dialog.open(DeleteUserDialogComponent, dialogConfig).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should containe user.username', () => {
    expect(component.user.username).toEqual(user.username);
  });
});

