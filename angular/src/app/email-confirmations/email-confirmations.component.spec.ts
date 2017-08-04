import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CoreModule } from '../core/core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SnackBarService } from '../shared/snackService/snackService.service';
import { BackendModule } from '../backend/backend.module';
import { EmailConfirmationsService } from './shared/email-confirmations.service';
import { EmailConfirmationsComponent } from './email-confirmations.component';

describe('EmailConfirmationsComponent', () => {
  let component: EmailConfirmationsComponent;
  let fixture: ComponentFixture<EmailConfirmationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailConfirmationsComponent ],
      providers: [
          SnackBarService,
          EmailConfirmationsService,
          { provide: ActivatedRoute,
                     useValue: {
                         url: Observable.of([{path: 'booking'}, {path: 'cancel'}]),
                         params: Observable.of({id: 123}),
                     },
          }],
      imports: [
        CoreModule,
        BackendModule.forRoot({environmentType: 0, restServiceRoot: 'v1'}),
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfirmationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
