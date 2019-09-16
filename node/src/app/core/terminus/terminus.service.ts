import { Injectable } from '@nestjs/common';
import {
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions,
  TerminusEndpoint,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly typeOrm: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('google', 'https://google.com'),
        async () => this.typeOrm.pingCheck('database', { timeout: 1500 }),
        async () => this.memory.checkHeap('memory_heap', 400 * 1024 * 1024),
        async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
