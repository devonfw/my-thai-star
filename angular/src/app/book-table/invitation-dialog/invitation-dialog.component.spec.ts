import { Md2Module } from 'md2';
import { CovalentModule } from '../../shared/covalent.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationDialogComponent } from './invitation-dialog.component';

describe('InvitationDialogComponent', () => {
  let component: InvitationDialogComponent;
  let fixture: ComponentFixture<InvitationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationDialogComponent ],
      imports: [
        CovalentModule,
        Md2Module,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
