import { async, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import * as fromRoot from '../../store/reducers';
import { UserAreaModule } from '../../user-area.module';
import { TwoFactorDialogComponent } from './two-factor-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { TranslocoRootModule } from '../../../transloco-root.module';

describe('TwoFactorDialogComponent', () => {
  let component: TwoFactorDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        TranslocoRootModule,
        BrowserAnimationsModule,
        UserAreaModule,
        RouterTestingModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromRoot.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    component = dialog.open(TwoFactorDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
