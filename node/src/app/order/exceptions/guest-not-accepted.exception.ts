import { BusinessLogicException } from '../../shared/exceptions/business-logic.exception';

export class GuestNotAccpetedException extends BusinessLogicException {
  constructor() {
    super('You need to accept your invitation before make your order.');
  }
}
