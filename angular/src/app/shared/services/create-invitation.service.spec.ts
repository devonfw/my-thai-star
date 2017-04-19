import { TestBed, inject } from '@angular/core/testing';
import { CreateInvitationService } from './create-invitation.service';

describe('InviationDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateInvitationService]
    });
  });

  it('should ...', inject([CreateInvitationService], (service: CreateInvitationService) => {
    expect(service).toBeTruthy();
  }));
});
