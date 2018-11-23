import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { WindowService } from './windowService.service';

describe('WindowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WindowService],
    });
  });

  it('should create', inject([WindowService], (service: WindowService) => {
    expect(service).toBeTruthy();
  }));
});
