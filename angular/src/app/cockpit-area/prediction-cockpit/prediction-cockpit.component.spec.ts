import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../core/config/config.service';
import { PredictionService } from '../services/prediction.service';
import { PredictionCockpitComponent } from './prediction-cockpit.component';
import { TestBed } from '@angular/core/testing';

describe('PredictionCockpitComponent', () => {
  let component: PredictionCockpitComponent;
  let http: HttpClient;
  let configService: ConfigService;
  let predictionService: PredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    http = TestBed.get(HttpClient);

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
