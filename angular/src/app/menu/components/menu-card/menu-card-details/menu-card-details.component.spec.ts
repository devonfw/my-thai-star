import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '../../../../core/core.module';
import { MenuCardDetailsComponent } from './menu-card-details.component';
import { TranslocoRootModule } from '../../../../transloco-root.module';
import { getTranslocoModule } from '../../../../transloco-testing.module';

describe('MenuCardDetailsComponent', () => {
  let component: MenuCardDetailsComponent;
  let fixture: ComponentFixture<MenuCardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCardDetailsComponent],
      imports: [CoreModule, getTranslocoModule()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardDetailsComponent);
    component = fixture.componentInstance;
    component.menuInfo = {
      dish: { id: 0, name: 'test', description: 'test', price: 0 },
      image: { content: '' },
      extras: [],
      likes: 0,
      isfav: true,
      categories: [{ id: 'test' }],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
