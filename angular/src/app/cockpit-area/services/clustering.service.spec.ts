import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ClusteringService } from './clustering.service';
import { config } from '../../core/config/config';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../core/config/config.service';

describe('ClusteringService', () => {
  let initialState;
  beforeEach(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [
        ClusteringService,
        provideMockStore({ initialState }),
        ConfigService,
      ],
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
