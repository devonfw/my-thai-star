import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../transloco-testing.module';
import { AboutYouComponent } from './about-you.component';

describe('AboutYouComponent', () => {
  let component: AboutYouComponent;
  let fixture: ComponentFixture<AboutYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutYouComponent ],
      imports:[getTranslocoModule()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
