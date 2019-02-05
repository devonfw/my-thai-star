import { Test, TestingModule } from '@nestjs/testing';
import { TerminusOptionsService } from './terminus.service';

describe('TerminusOptionsService', () => {
  let service: TerminusOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminusOptionsService],
    }).compile();

    service = module.get<TerminusOptionsService>(TerminusOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
