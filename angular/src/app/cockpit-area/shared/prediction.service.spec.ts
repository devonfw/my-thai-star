import { TestBed, inject } from '@angular/core/testing';
import { OrderView } from '../../shared/view-models/interfaces';
import { PredictionService } from './prediction.service';
import { HttpClientModule } from '@angular/common/http';

describe('PredictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredictionService],
      imports: [HttpClientModule],
    });
  });

  it('should create', inject([PredictionService], (service: PredictionService) => {
    expect(service).toBeTruthy();
  }));

});
