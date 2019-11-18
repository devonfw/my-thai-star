import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import { config } from '../../core/config/config';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../core/config/config.service';

describe('MenuService', () => {
  let initialState;
  beforeEach(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MenuService,
        provideMockStore({ initialState }),
        ConfigService,
      ],
    });
  });

  it('should create', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));
});
