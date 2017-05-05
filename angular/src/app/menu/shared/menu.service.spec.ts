import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { MenuService } from './menu.service';
import { BackendModule } from './../../shared/backend/backend.module';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, BackendModule],
      providers: [MenuService],
    });
  });

  it('should ...', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));
});
