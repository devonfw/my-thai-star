import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { OrderView } from '../../shared/view-models/interfaces';
import { PriceCalculatorService } from '../../sidenav/services/price-calculator.service';
import { WaiterCockpitService } from './waiter-cockpit.service';
import { ConfigService } from '../../core/config/config.service';
import { config } from '../../core/config/config';
import { provideMockStore } from '@ngrx/store/testing';

describe('WaiterCockpitService', () => {
  let initialState;
  beforeEach(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        WaiterCockpitService,
        PriceCalculatorService,
        ConfigService,
      ],
      imports: [HttpClientTestingModule],
    });
  });

  it('should create', inject(
    [WaiterCockpitService],
    (service: WaiterCockpitService) => {
      expect(service).toBeTruthy();
    },
  ));

  describe('Form composer', () => {
    it('should compose correctly order info', inject(
      [WaiterCockpitService],
      (service: WaiterCockpitService) => {
        const orderData: OrderView[] = [
          {
            dish: {
              id: 0,
              name: 'dish1',
              price: 14.75,
            },
            extras: [
              { id: 0, price: 1, name: 'Extra Curry' },
              { id: 1, price: 2, name: 'Extra pork' },
            ],
            orderLine: {
              amount: 2,
              comment: 'comment',
            },
          },
          {
            dish: {
              id: 0,
              name: 'dish2',
              price: 12.15,
            },
            extras: [{ id: 0, price: 1, name: 'Extra Curry' }],
            orderLine: {
              amount: 1,
              comment: '',
            },
          },
        ];

        const orderResult: any = [
          {
            dish: { id: 0, name: 'dish1', price: (14.75 + 1 + 2) * 2 },
            extras: 'Extra Curry, Extra pork',
            orderLine: { amount: 2, comment: 'comment' },
          },
          {
            dish: { id: 0, name: 'dish2', price: 12.15 + 1 },
            extras: 'Extra Curry',
            orderLine: { amount: 1, comment: '' },
          },
        ]; // 2 dishes + 1 extra curry + 2 extra pork // 1 extra curry

        expect(service.orderComposer(orderData)).toEqual(orderResult);
      },
    ));
  });
});
