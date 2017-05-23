import { TestBed, inject } from '@angular/core/testing';

import { ExtraView, OrderView } from '../../shared/viewModels/interfaces';
import { PriceCalculatorService } from './price-calculator.service';

describe('PriceCalculatorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceCalculatorService],
    });
  });

  it('should be properly injected', inject([PriceCalculatorService], (service: PriceCalculatorService) => {
    expect(service).toBeTruthy();
  }));

  describe('check getPrice method', () => {

    it('should calculate price for single order without extras', inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        name: 'Order without extras',
        comment: '',
        amount: 1,
        extras: [],
      };

      expect(service.getPrice(order)).toEqual(order.price);
    }));

    it('should calculate price for single order with single extra ingredient selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraRice: ExtraView = {
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        name: 'Order with extra rice',
        comment: '',
        amount: 1,
        extras: [extraRice],
      };

      expect(service.getPrice(order)).toEqual(order.price + extraRice.price);
    }));

    it('should calculate price for single order with single extra ingredient not selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        name: 'Order without extras',
        comment: '',
        amount: 1,
        extras: [{
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: false,
        }],
      };

      expect(service.getPrice(order)).toEqual(order.price);
    }));

    it('should calculate price for single order with multiple extra ingredients selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraRice: ExtraView = {
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const extraTofu: ExtraView = {
          id: 1,
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        name: 'Order with extra rice and tofu',
        comment: '',
        amount: 1,
        extras: [extraRice, extraTofu],
      };

      expect(service.getPrice(order)).toEqual(order.price + extraRice.price + extraTofu.price);
    }));

    it('should calculate price for single order with multiple extra ingredients - none selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        name: 'Order without extras',
        comment: '',
        amount: 1,
        extras: [{
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: false,
        }, {
          id: 1,
          name: 'Tofu',
          price: 3.00,
          selected: false,
      }],
      };

      expect(service.getPrice(order)).toEqual(order.price);
    }));

    it('should calculate price for single order with multiple extra ingredients, one of two available extras selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraTofu: ExtraView = {
          id: 1,
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        name: 'Order with extra tofu',
        comment: '',
        amount: 1,
        extras: [{
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: false,
        }, extraTofu],
      };

      expect(service.getPrice(order)).toEqual(order.price + extraTofu.price);
    }));

    it('should calculate price for multiple orders without extras', inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        name: 'Order without extras',
        comment: '',
        amount: 4,
        extras: [],
      };

      expect(service.getPrice(order)).toEqual(order.price * order.amount);
    }));

    it('should calculate price for multiple orders with single extra ingredient selected',
      inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraRice: ExtraView = {
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        name: 'Order with extra rice',
        comment: '',
        amount: 4,
        extras: [extraRice],
      };

      expect(service.getPrice(order)).toEqual((order.price + extraRice.price) * order.amount);
    }));

    it('should calculate price for multiple orders with multiple extra ingredients selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraRice: ExtraView = {
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const extraTofu: ExtraView = {
          id: 1,
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        name: 'Order with extra rice and tofu',
        comment: '',
        amount: 3,
        extras: [extraRice, extraTofu],
      };

      expect(service.getPrice(order)).toEqual((order.price + extraRice.price + extraTofu.price) * order.amount);
    }));

    it('should calculate price for multiple orders with multiple extra ingredients - none selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        name: 'Order without extras',
        comment: '',
        amount: 3,
        extras: [{
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: false,
        }, {
          id: 1,
          name: 'Tofu',
          price: 3.00,
          selected: false,
      }],
      };

      expect(service.getPrice(order)).toEqual(order.price * order.amount);
    }));

    it('should calculate price for multiple order with multiple extra ingredients, one of two available extras selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraTofu: ExtraView = {
          id: 1,
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        name: 'Order with extra tofu',
        comment: '',
        amount: 3,
        extras: [{
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: false,
        }, extraTofu],
      };

      expect(service.getPrice(order)).toEqual((order.price + extraTofu.price) * order.amount);
    }));

  });
  describe('check getTotalPrice method', () => {
    it('should calculate price for mutliple orders of different kind without extras',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {

      const orderWithoutExtras: OrderView = {
        price: 12.50,
        name: 'Order without extras',
        comment: '',
        amount: 1,
        extras: [],
      };
      const expensiveOrderWithoutExtras: OrderView = {
        price: 15.50,
        name: 'Expensive order without extras',
        comment: '',
        amount: 1,
        extras: [],
      };

      const orders: OrderView[] = [orderWithoutExtras, expensiveOrderWithoutExtras];

      expect(service.getTotalPrice(orders))
        .toEqual(orderWithoutExtras.price + expensiveOrderWithoutExtras.price * expensiveOrderWithoutExtras.amount);
    }));

    it('should calculate price for mutliple orders of different kind with extras',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {

      const extraRice: ExtraView = {
          id: 0,
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const extraTofu: ExtraView = {
          id: 1,
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };

      const order: OrderView = {
        price: 12.50,
        name: 'Order',
        comment: '',
        amount: 2,
        extras: [extraRice, extraTofu],
      };
      const expensiveOrder: OrderView = {
        price: 15.50,
        name: 'Expensive order',
        comment: '',
        amount: 1,
        extras: [extraTofu, {
          id: 2,
          name: 'Curry',
          price: 1.50,
          selected: false,
        }],
      };

      const orders: OrderView[] = [order, expensiveOrder];

      expect(service.getTotalPrice(orders))
        .toEqual((order.price + extraRice.price + extraTofu.price) * order.amount
        + (expensiveOrder.price + extraTofu.price) * expensiveOrder.amount);
    }));
  });
});
