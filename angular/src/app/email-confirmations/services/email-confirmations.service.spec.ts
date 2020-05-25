import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { EmailConfirmationsService } from './email-confirmations.service';
import { config } from '../../core/config/config';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../core/config/config.service';

describe('EmailConfirmationsService', () => {
  beforeEach(() => {
    const initialState = { config };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmailConfirmationsService,
        provideMockStore({ initialState }),
        ConfigService,
      ],
    });
  });

  it('should create', inject(
    [EmailConfirmationsService],
    (service: EmailConfirmationsService) => {
      expect(service).toBeTruthy();
    },
  ));
});
