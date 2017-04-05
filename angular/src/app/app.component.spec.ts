import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { CovalentCoreModule } from '@covalent/core';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { SidenavSharedServiceService } from './sidenav/shared/sidenav-shared-service.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavOrderComponent } from './sidenav/sidenav-order/sidenav-order.component'

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SidenavComponent, SidenavOrderComponent ],
      providers: [SidenavSharedServiceService],
      imports: [
        RouterModule,
        RouterTestingModule,
        CovalentCoreModule.forRoot()
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
