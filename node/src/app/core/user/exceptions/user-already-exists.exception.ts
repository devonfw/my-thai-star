import { BusinessLogicException } from '../../../shared/exceptions/business-logic.exception';

export class UserAlreadyExsitsException extends BusinessLogicException {
  constructor() {
    super('User already exists');
  }
}
