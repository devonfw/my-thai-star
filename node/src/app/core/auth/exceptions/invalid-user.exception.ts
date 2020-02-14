import { BusinessLogicException } from '../../../shared/exceptions/business-logic.exception';

export class InvalidUserException extends BusinessLogicException {
  constructor() {
    super('Wrong username or password');
  }
}
