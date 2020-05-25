import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardCommentsComponent } from './menu-card-comments.component';
import { CoreModule } from '../../../../core/core.module';
import { TranslocoRootModule } from '../../../../transloco-root.module';
import { getTranslocoModule } from '../../../../transloco-testing.module';

describe('MenuCardCommentsComponent', () => {
  let component: MenuCardCommentsComponent;
  let fixture: ComponentFixture<MenuCardCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCardCommentsComponent],
      imports: [CoreModule, getTranslocoModule()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
