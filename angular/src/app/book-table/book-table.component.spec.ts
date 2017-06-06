import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Md2Module } from 'md2';
import { CovalentModule } from '../shared/covalent.module';
import { SidenavService } from '../sidenav/shared/sidenav.service';

import { BookingInMemoryService } from '../shared/backend/booking/booking-in-memory.service';
import { BookingDataService } from '../shared/backend/booking/booking-data-service';
import { BookTableService } from './shared/book-table.service';
import { WindowService } from '../shared/windowService/windowService.service';

import { BookTableComponent } from './book-table.component';

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableComponent ],
      providers: [
        SidenavService,
        WindowService,
        BookTableService,
        {provide: BookingDataService, useClass: BookingInMemoryService},
 ],
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
