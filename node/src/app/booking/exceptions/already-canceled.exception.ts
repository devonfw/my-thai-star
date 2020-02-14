import { BusinessLogicException } from '../../shared/exceptions/business-logic.exception';

export class AlreadyCanceledException extends BusinessLogicException {
  constructor() {
    super('Already canceled');
  }
}
