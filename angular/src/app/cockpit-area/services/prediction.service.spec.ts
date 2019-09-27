import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { PredictionService } from './prediction.service';

describe('PredictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredictionService],
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
