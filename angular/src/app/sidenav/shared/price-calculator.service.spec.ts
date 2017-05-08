import { TestBed, inject } from '@angular/core/testing';

import { ExtraView, OrderView } from '../../shared/models/interfaces';
import { PriceCalculatorService } from './price-calculator.service';

describe('PriceCalculatorService', () => {



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceCalculatorService]
    });
  });

  it('should be properly injected', inject([PriceCalculatorService], (service: PriceCalculatorService) => {
    expect(service).toBeTruthy();
  }));


  describe('check getPrice method', () => {


    it('should calculate price for single order without extras', inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order without extras',
        comment: '',
        number: 1,
        options: [],
      };

      expect(service.getPrice(order)).toEqual(order.price);
    }));

    it('should calculate price for multiple orders without extras', inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order without extras',
        comment: '',
        number: 4,
        options: [],
      };

      expect(service.getPrice(order)).toEqual(order.price * order.number);
    }));

    it('should calculate price for single order with single extra ingredient selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraRice: ExtraView = {
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order with extra rice',
        comment: '',
        number: 1,
        options: [extraRice],
      };

      expect(service.getPrice(order)).toEqual(order.price + extraRice.price);
    }));

    it('should calculate price for single order with single extra ingredient not selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order without extras',
        comment: '',
        number: 1,
        options: [{
          name: 'Rice',
          price: 2.00,
          selected: false,
        }],
      };

      expect(service.getPrice(order)).toEqual(order.price);
    }));

    it('should calculate price for multiple orders with single extra ingredient selected',
      inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraRice: ExtraView = {
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order with extra rice',
        comment: '',
        number: 4,
        options: [extraRice],
      };

      expect(service.getPrice(order)).toEqual((order.price + extraRice.price) * order.number);
    }));

    it('should calculate price for single order with single extra ingredient not selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order without extras',
        comment: '',
        number: 4,
        options: [{
          name: 'Rice',
          price: 2.00,
          selected: false,
        }],
      };

      expect(service.getPrice(order)).toEqual(order.price * order.number);
    }));

    it('should calculate price for single order with multiple extra ingredients selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraRice: ExtraView = {
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const extraTofu: ExtraView = {
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order with extra rice and tofu',
        comment: '',
        number: 1,
        options: [extraRice, extraTofu],
      };

      expect(service.getPrice(order)).toEqual(order.price + extraRice.price + extraTofu.price);
    }));

    it('should calculate price for single order with multiple extra ingredients - none selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order without extras',
        comment: '',
        number: 1,
        options: [{
          name: 'Rice',
          price: 2.00,
          selected: false,
        }, {
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
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order with extra tofu',
        comment: '',
        number: 1,
        options: [{
          name: 'Rice',
          price: 2.00,
          selected: false,
        }, extraTofu],
      };

      expect(service.getPrice(order)).toEqual(order.price + extraTofu.price);
    }));


    it('should calculate price for multiple orders with multiple extra ingredients selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraRice: ExtraView = {
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const extraTofu: ExtraView = {
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order with extra rice and tofu',
        comment: '',
        number: 3,
        options: [extraRice, extraTofu],
      };

      expect(service.getPrice(order)).toEqual((order.price + extraRice.price + extraTofu.price) * order.number);
    }));

    it('should calculate price for multiple orders with multiple extra ingredients - none selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order without extras',
        comment: '',
        number: 3,
        options: [{
          name: 'Rice',
          price: 2.00,
          selected: false,
        }, {
          name: 'Tofu',
          price: 3.00,
          selected: false,
      }],
      };

      expect(service.getPrice(order)).toEqual(order.price * order.number);
    }));

    it('should calculate price for single order with multiple extra ingredients, one of two available extras selected',
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {
      const extraTofu: ExtraView = {
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };
      const order: OrderView = {
        price: 12.50,
        orderName: 'Order with extra tofu',
        comment: '',
        number: 3,
        options: [{
          name: 'Rice',
          price: 2.00,
          selected: false,
        }, extraTofu],
      };

      expect(service.getPrice(order)).toEqual((order.price + extraTofu.price) * order.number);
    }));

  });
  describe('check getTotalPrice method', () => {
    it('should calculate price for mutliple orders of different kind without extras', 
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {

      const orderWithoutExtras: OrderView = {
        price: 12.50,
        orderName: 'Order without extras',
        comment: '',
        number: 1,
        options: [],
      };
      const expensiveOrderWithoutExtras: OrderView = {
        price: 15.50,
        orderName: 'Expensive order without extras',
        comment: '',
        number: 1,
        options: [],
      };

      const orders: OrderView[] = [orderWithoutExtras, expensiveOrderWithoutExtras];

      expect(service.getTotalPrice(orders))
        .toEqual(orderWithoutExtras.price + expensiveOrderWithoutExtras.price * expensiveOrderWithoutExtras.number);
    }));

    it('should calculate price for mutliple orders of different kind without extras', 
        inject([PriceCalculatorService], (service: PriceCalculatorService) => {

      const extraRice: ExtraView = {
          name: 'Rice',
          price: 2.00,
          selected: true,
      };
      const extraTofu: ExtraView = {
          name: 'Tofu',
          price: 3.00,
          selected: true,
      };

      const order: OrderView = {
        price: 12.50,
        orderName: 'Order',
        comment: '',
        number: 2,
        options: [extraRice, extraTofu],
      };
      const expensiveOrder: OrderView = {
        price: 15.50,
        orderName: 'Expensive order',
        comment: '',
        number: 1,
        options: [extraTofu, {
          name: 'Curry',
          price: 1.50,
          selected: false,
        }],
      };

      const orders: OrderView[] = [order, expensiveOrder];

      expect(service.getTotalPrice(orders))
        .toEqual((order.price + extraRice.price + extraTofu.price) * order.number
        + (expensiveOrder.price + extraTofu.price) * expensiveOrder.number);
    }));
  });
});
