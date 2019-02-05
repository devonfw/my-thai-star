import { IConfig } from '../app/core/configuration/types';
import { join } from 'path';

const def: IConfig = {
  isDev: true,
  host: 'de-mucdevondepl01',
  port: 8081,
  jwtConfig: {
    secret: '1q5cYpNHmjIwwfXBxnce3vAi1bfwy4KeM1dzpdSGvjuGkGDfjw9mml11aOkzC',
    signOptions: { expiresIn: '24h' },
  },
  swaggerConfig: {
    swaggerTitle: 'My Thai Star',
    swaggerDescription: 'API Documentation',
    swaggerVersion: '0.0.1',
    swaggerBasepath: 'mythaistar/services/rest',
  },
  clientUrl: 'http://de-mucdevondepl01:8091',
  mailerConfig: {
    mailOptions: {
      host: 'maildev',
      port: 25,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    },
    emailFrom: 'noreply@capgemini.com',
    hbsOptions: {
      templatesDir: join(__dirname, '../..', 'templates/views'),
      partialsDir: join(__dirname, '../..', 'templates/partials'),
      helpers: [
        {
          name: 'bool2word',
          func: (value: boolean) => (value ? 'accepted' : 'declined'),
        },
        {
          name: 'formatDate',
          func: (value: Date) => value.toLocaleString(),
        },
        {
          name: 'toNumber',
          func: (value: any) => Number(value),
        },
      ],
    },
  },
  database: {
    type: 'mariadb',
    host: 'de-mucdevondepl01',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
    synchronize: false,
    migrationsRun: true,
    supportBigNumbers: true,
    logging: false,
    entities: ['./dist/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/production/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
  },
};

export default def;
