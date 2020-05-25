import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { PredictionService } from './prediction.service';
import { ConfigService } from '../../core/config/config.service';
import { provideMockStore } from '@ngrx/store/testing';
import { config } from '../../core/config/config';

describe('PredictionService', () => {
  let initialState;
  beforeEach(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [
        PredictionService,
        provideMockStore({ initialState }),
        ConfigService,
      ],
      imports: [HttpClientTestingModule],
    });
  });

  it('should create', inject(
    [PredictionService],
    (service: PredictionService) => {
      expect(service).toBeTruthy();
    },
  ));
});
