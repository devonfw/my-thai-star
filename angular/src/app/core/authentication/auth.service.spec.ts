import { CoreModule } from '../../core/core.module';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from 'app/core/authentication/auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [CoreModule],
        providers: [AuthService],
    });
  });

  it('should create', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
