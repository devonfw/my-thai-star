import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ClusteringService } from './clustering.service';

describe('ClusteringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClusteringService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should create', inject(
    [ClusteringService],
    (service: ClusteringService) => {
      expect(service).toBeTruthy();
    },
  ));
});
