import { OrderLine } from '../../../app/order/model/entities/order-line.entity';

export const orderLinesSample: OrderLine[] = [
  { id: 1, modificationCounter: 1, dishId: 1, amount: 2, comment: 'please not too spicy', orderId: 1 },
  { id: 2, modificationCounter: 1, dishId: 5, amount: 1, orderId: 1 },
  { id: 3, modificationCounter: 1, dishId: 3, amount: 1, orderId: 2 },
  { id: 4, modificationCounter: 1, dishId: 5, amount: 2, orderId: 2 },
  { id: 5, modificationCounter: 1, dishId: 3, amount: 1, orderId: 2 },
  { id: 6, modificationCounter: 1, dishId: 4, amount: 1, orderId: 2 },
  { id: 7, modificationCounter: 1, dishId: 3, amount: 1, orderId: 3 },
  { id: 8, modificationCounter: 1, dishId: 6, amount: 1, orderId: 4 },
  { id: 9, modificationCounter: 1, dishId: 6, amount: 1, orderId: 5 },
  { id: 10, modificationCounter: 1, dishId: 4, amount: 1, orderId: 6 },
  { id: 11, modificationCounter: 1, dishId: 6, amount: 2, orderId: 7 },
  { id: 12, modificationCounter: 1, dishId: 4, amount: 1, orderId: 8 },
];
