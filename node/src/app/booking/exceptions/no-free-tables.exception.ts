import { BusinessLogicException } from '../../shared/exceptions/business-logic.exception';

export class NoFreeTablesException extends BusinessLogicException {
  constructor() {
    super('No free tables for your booking date');
  }
}
