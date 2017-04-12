import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTableComponent } from './book-table.component';
import { CovalentCoreModule } from '@covalent/core';
import { SidenavSharedServiceService } from '../sidenav/shared/sidenav-shared-service.service';

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableComponent ],
      providers: [ SidenavSharedServiceService ],
      imports: [
        BrowserAnimationsModule,
        CovalentCoreModule.forRoot()
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
