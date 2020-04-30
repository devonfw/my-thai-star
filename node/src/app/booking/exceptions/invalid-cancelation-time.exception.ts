import { BusinessLogicException } from '../../shared/exceptions/business-logic.exception';

export class InvalidCancelationTimeException extends BusinessLogicException {
  constructor() {
    super('You can not cancel at this time');
  }
}
