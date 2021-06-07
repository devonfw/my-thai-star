import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../core/core.module';
import { AppModule } from '../app.module';
import { AboutYouComponent } from './about-you.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../core/config/config.service';
import { config } from '../core/config/config';
import { getTranslocoModule } from '../transloco-testing.module';

fdescribe('RegisterDialogComponent', () => {
  let component: AboutYouComponent;
  let dialog: MatDialog;
  let initialState;
  beforeEach(async(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        ConfigService,
        HttpClient,
      ],
      imports: [
        BrowserAnimationsModule,
        AppModule,
        getTranslocoModule(),
        CoreModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
  
    dialog = TestBed.inject(MatDialog);
    component = dialog.open(AboutYouComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
