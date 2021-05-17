import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../core/core.module';
import { WaiterCockpitModule } from '../cockpit.module';
import { AdminService } from '../services/admin.service';
import { AdminCockpitComponent } from './admin-cockpit.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../core/config/config.service';
import { config } from '../../core/config/config';
import { getTranslocoModule } from '../../transloco-testing.module';

fdescribe('AdminCockpitComponent', () => {
  let component: AdminCockpitComponent;
  let initialState;

  beforeEach(async(() => {
    initialState = { config };
   
  }));
  beforeEach(() => {
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
  component = TestBed.inject(AdminCockpitComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});