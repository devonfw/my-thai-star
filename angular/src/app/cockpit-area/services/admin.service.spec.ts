import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { config } from '../../core/config/config';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../core/config/config.service';

describe('AdminService', () => {
  let initialState;
  beforeEach(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [
        AdminService,
        provideMockStore({ initialState }),
        ConfigService,
      ],
      imports: [HttpClientTestingModule],
    });
  });

  it('should create', inject(
    [AdminService],
    (service: AdminService) => {
      expect(service).toBeTruthy();
    },
  ));
});
