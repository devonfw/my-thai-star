import { BusinessLogicException } from '../../shared/exceptions/business-logic.exception';

export class InvalidBookingException extends BusinessLogicException {
  constructor() {
    super('You are tryting to create a invalid booking.');
  }
}
