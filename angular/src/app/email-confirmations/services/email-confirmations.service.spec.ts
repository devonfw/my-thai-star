import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { EmailConfirmationsService } from './email-confirmations.service';

describe('EmailConfirmationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailConfirmationsService],
    });
  });

  it('should create', inject(
    [EmailConfirmationsService],
    (service: EmailConfirmationsService) => {
      expect(service).toBeTruthy();
    },
  ));
});
