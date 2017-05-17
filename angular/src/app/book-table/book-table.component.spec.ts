import { Md2Module } from 'md2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentModule } from '../shared/covalent.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTableComponent } from './book-table.component';
import { SidenavService } from '../sidenav/shared/sidenav.service';
import { WindowService } from '../shared/windowService/windowService.service';

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableComponent ],
      providers: [ SidenavService, WindowService ],
      imports: [
        BrowserAnimationsModule,
        CovalentModule,
        Md2Module,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
