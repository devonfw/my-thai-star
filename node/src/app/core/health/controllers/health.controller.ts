import { Controller, Get } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  HealthCheckService,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dns: DNSHealthIndicator,
    private readonly typeOrm: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<any> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => this.dns.pingCheck('google', 'https://google.com'),
      async (): Promise<HealthIndicatorResult> => this.typeOrm.pingCheck('database', { timeout: 1500 }),
      async (): Promise<HealthIndicatorResult> => this.memory.checkHeap('memory_heap', 400 * 1024 * 1024),
      async (): Promise<HealthIndicatorResult> => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }
}
