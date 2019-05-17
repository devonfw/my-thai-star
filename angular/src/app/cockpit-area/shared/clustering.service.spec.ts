import { TestBed, inject } from '@angular/core/testing';
import { OrderView } from '../../shared/view-models/interfaces';
import { ClusteringService } from './clustering.service';
import { HttpClientModule } from '@angular/common/http';

describe('ClusteringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClusteringService],
      imports: [HttpClientModule],
    });
  });

  it('should create', inject([ClusteringService], (service: ClusteringService) => {
    expect(service).toBeTruthy();
  }));

});
