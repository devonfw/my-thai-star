import testConfig from '../../../../config/test';
import { WinstonLogger } from '../../../shared/logger/winston.logger';
import { BookingMailerUseCase } from './booking-mailer.use-case';

describe('BookingEmailsService', () => {
  let service: BookingMailerUseCase;

  beforeAll(async () => {
    service = new BookingMailerUseCase({ values: testConfig } as any, new WinstonLogger(), {} as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
