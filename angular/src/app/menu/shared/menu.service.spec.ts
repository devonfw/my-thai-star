import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MenuService]
    });
  });

  it('should ...', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));
});
