import { BusinessLogicException } from './business-logic.exception';

export class InvalidTokenException extends BusinessLogicException {
  constructor() {
    super('Invalid token');
  }
}
