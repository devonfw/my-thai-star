import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentAlertComponent } from './comment-alert.component';

describe('CommentAlertComponent', () => {
  let component: CommentAlertComponent;
  let fixture: ComponentFixture<CommentAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentAlertComponent],
      imports: [MatButtonModule, MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
