import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../core/core.module';
import { PredictionCockpitComponent } from './prediction-cockpit.component';
import { PredictionService } from '../shared/prediction.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('PredictionCockpitComponent', () => {
  let component: PredictionCockpitComponent;
  let fixture: ComponentFixture<PredictionCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PredictionCockpitComponent],
      providers: [
        HttpClient, 
        PredictionService,
      ],
      imports: [
        CoreModule,
        BrowserAnimationsModule,
        HttpClientModule,
		ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
