import { BusinessLogicException } from '../../shared/exceptions/business-logic.exception';

export class OrderAlreadyDoneException extends BusinessLogicException {
  constructor() {
    super('Booking already has an order');
  }
}
