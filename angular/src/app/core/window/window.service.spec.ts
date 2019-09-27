import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { WindowService } from './window.service';

describe('WindowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WindowService],
    });
  });

  it('should create', inject([WindowService], (service: WindowService) => {
    expect(service).toBeTruthy();
  }));
});
