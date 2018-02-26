import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavService } from '../shared/sidenav.service';
import { PriceCalculatorService } from '../shared/price-calculator.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { SidenavOrderComponent } from './sidenav-order.component';
import { CoreModule } from '../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavOrderComponent ],
      providers: [
        SidenavService,
        PriceCalculatorService,
        SnackBarService,
      ],
      imports: [
        CoreModule,
        TranslateModule.forRoot(),
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavOrderComponent);
    component = fixture.componentInstance;
    component.order = {
      dish: {
        id: 0,
        name: 'Red Curry',
        price: 5.90,
      },
      orderLine: {
        amount: 0,
        comment: 'comment',
      },
      extras: [
        { id: 0, name: 'Tofu', price: 1, selected: false },
        { id: 1, name: 'Chiken', price: 1, selected: false },
        { id: 2, name: 'Pork', price: 2, selected: false }],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
