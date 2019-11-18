import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../core/config/config.service';
import { PredictionService } from '../services/prediction.service';
import { PredictionCockpitComponent } from './prediction-cockpit.component';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { State } from 'app/store';

describe('PredictionCockpitComponent', () => {
  let component: PredictionCockpitComponent;
  let http: HttpClient;
  let configService: ConfigService;
  let predictionService: PredictionService;
  // tslint:disable-next-line:prefer-const
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    http = TestBed.get(HttpClient);

    configService = new ConfigService(store);
    predictionService = new PredictionService(http, configService);
    component = new PredictionCockpitComponent(predictionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
