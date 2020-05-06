import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../../core/core.module';
import * as fromRoot from '../../../store/reducers';
import { SidenavOrderComponent } from './sidenav-order.component';

describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;
  beforeEach(() => {
    const matDialogStub = {
      open: () => ({
        afterClosed: () => ({ subscribe: () => ({}) }),
      }),
    };
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        CoreModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromRoot.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidenavOrderComponent],
      providers: [{ provide: MatDialog, useValue: matDialogStub }],
    });
    fixture = TestBed.createComponent(SidenavOrderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('addComment', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog,
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.addComment();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});
