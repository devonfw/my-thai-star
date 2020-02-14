import { BusinessLogicException } from '../../shared/exceptions/business-logic.exception';

export class AlreadyAcceptedException extends BusinessLogicException {
  constructor() {
    super('You can not modify this value again.');
  }
}
