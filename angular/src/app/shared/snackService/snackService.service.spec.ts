import { CovalentModule } from '../covalent.module';
import { TestBed, inject } from '@angular/core/testing';
import { SnackBarService } from './snackService.service';

describe('SnackBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [CovalentModule],
        providers: [SnackBarService],
    });
  });

  it('should ...', inject([SnackBarService], (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
