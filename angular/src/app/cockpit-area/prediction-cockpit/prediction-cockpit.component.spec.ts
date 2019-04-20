import { HttpClient/*, HttpClientModule*/ } from '@angular/common/http';
//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { CoreModule } from '../../core/core.module';
import { PredictionCockpitComponent } from './prediction-cockpit.component';
import { PredictionService } from '../shared/prediction.service';
//import { ReactiveFormsModule } from '@angular/forms';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { ConfigService } from '../../core/config/config.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

describe('PredictionCockpitComponent', () => {
  let component: PredictionCockpitComponent;
  //let fixture: ComponentFixture<PredictionCockpitComponent>;
  let http: HttpClient;
  let configService: ConfigService;
  let predictionService: PredictionService;
  // tslint:disable-next-line:prefer-const
  let translate: TranslateService;
  // tslint:disable-next-line:prefer-const
  let dialog: MatDialog;

  //beforeEach(async(() => {
  //  TestBed.configureTestingModule({
   //   declarations: [PredictionCockpitComponent],
    //  providers: [
     //   HttpClient, 
       // PredictionService,
  //    ],
  //    imports: [
  //      CoreModule,
  //      BrowserAnimationsModule,
  //      HttpClientModule,
	//	ReactiveFormsModule,
   //   ],
   // })
   // .compileComponents();
  // }));

  beforeEach(() => {
    //fixture = TestBed.createComponent(PredictionCockpitComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
    configService = new ConfigService(http);
    predictionService = new PredictionService(
      http,
      configService,
    );
    component = new PredictionCockpitComponent(
      predictionService,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
