import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../core/config/config.service';
import { PredictionService } from '../services/prediction.service';
import { PredictionCockpitComponent } from './prediction-cockpit.component';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import { provideMockStore } from '@ngrx/store/testing';
import { config } from '../../core/config/config';

describe('PredictionCockpitComponent', () => {
  let component: PredictionCockpitComponent;
  let http: HttpClient;
  let configService: ConfigService;
  let predictionService: PredictionService;
  // tslint:disable-next-line:prefer-const
  let store: Store<State>;
  let initialState;

  beforeEach(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState }), ConfigService],
      imports: [HttpClientTestingModule],
    });
    http = TestBed.inject(HttpClient);
    store = TestBed.inject(Store);

    configService = new ConfigService(store);
    predictionService = new PredictionService(http, configService);
    component = new PredictionCockpitComponent(predictionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
