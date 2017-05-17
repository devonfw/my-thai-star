import { Md2Module } from 'md2';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovalentModule } from '../../shared/covalent.module';

import { BookTableDialogComponent } from './book-table-dialog.component';

describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let fixture: ComponentFixture<BookTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableDialogComponent ],
      imports: [
        CovalentModule,
        Md2Module,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
