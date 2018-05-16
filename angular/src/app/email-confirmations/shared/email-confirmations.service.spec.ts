import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { EmailConfirmationsService } from './email-confirmations.service';

describe('EmailConfirmationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        EmailConfirmationsService,
      ],
    });
  });

  it('should create', inject([EmailConfirmationsService], (service: EmailConfirmationsService) => {
    expect(service).toBeTruthy();
  }));
});
