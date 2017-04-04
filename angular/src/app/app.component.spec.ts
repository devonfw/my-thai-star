import { SidenavSharedServiceService } from './sidenav/sidenav-shared-service.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { RouterTestingModule } from '@angular/router/testing'
import { RouterModule } from '@angular/router';
import { CovalentCoreModule } from '@covalent/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SidenavComponent ],
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
