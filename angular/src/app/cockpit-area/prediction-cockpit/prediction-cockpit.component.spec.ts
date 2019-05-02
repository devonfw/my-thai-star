import { HttpClient/*, HttpClientModule*/ } from '@angular/common/http';
import { PredictionCockpitComponent } from './prediction-cockpit.component';
import { PredictionService } from '../shared/prediction.service';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { ConfigService } from '../../core/config/config.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

describe('PredictionCockpitComponent', () => {
  let component: PredictionCockpitComponent;
  let http: HttpClient;
  let configService: ConfigService;
  let predictionService: PredictionService;
  let translate: TranslateService;
  let dialog: MatDialog;

  beforeEach(() => {
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
