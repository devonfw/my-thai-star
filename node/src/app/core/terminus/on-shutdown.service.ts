import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class OnShutdownService implements OnApplicationShutdown {
  constructor(private readonly connection: Connection) {}
  onApplicationShutdown(signal?: string | undefined) {
    console.log('Me voy por culpa de: ' + signal);
    this.connection.close();
  }
}
