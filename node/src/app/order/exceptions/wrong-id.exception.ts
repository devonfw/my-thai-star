import { BusinessLogicException } from '../../shared/exceptions/business-logic.exception';

export class WrongIdException extends BusinessLogicException {
  constructor() {
    super('Wrong id');
  }
}
