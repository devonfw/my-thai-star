import { TestBed, inject } from '@angular/core/testing';
import { OrderView } from '../../shared/viewModels/interfaces';
import { PredictionService } from './prediction.service';

describe('PredictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PredictionService],
    });
  });

  it('should create', inject([PredictionService], (service: PredictionService) => {
    expect(service).toBeTruthy();
  }));

});
