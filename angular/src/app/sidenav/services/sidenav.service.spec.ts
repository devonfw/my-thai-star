import { inject, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../../core/core.module';
import * as fromRoot from '../../store/reducers';
import { SidenavService } from './sidenav.service';

describe('SidenavSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService],
      imports: [
        CoreModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromRoot.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
    });
  });

  it('should create', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
