import { TestBed, inject } from '@angular/core/testing';
import { MenuService } from './menu.service';
import { HttpClientModule } from '@angular/common/http';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        MenuService,
      ],
    });
  });

  it('should create', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));
});
