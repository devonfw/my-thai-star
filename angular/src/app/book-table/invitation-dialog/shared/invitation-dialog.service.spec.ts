import { TestBed, inject } from '@angular/core/testing';
import { InvitationDialogService } from './invitation-dialog.service';

describe('InviationDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationDialogService]
    });
  });

  it('should ...', inject([InvitationDialogService], (service: InvitationDialogService) => {
    expect(service).toBeTruthy();
  }));
});
