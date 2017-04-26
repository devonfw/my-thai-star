import { TestBed, inject } from '@angular/core/testing';
import { InvitationDialogService } from './invitation-dialog.service';
import { HttpModule} from '@angular/http';

describe('InviationDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [InvitationDialogService]
    });
  });

  it('should ...', inject([InvitationDialogService], (service: InvitationDialogService) => {
    expect(service).toBeTruthy();
  }));
});
