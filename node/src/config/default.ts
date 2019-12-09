import { IConfig } from '../app/core/configuration/model/types';
import { join } from 'path';

const def: IConfig = {
  isDev: true,
  host: 'localhost',
  port: 8081,
  jwtConfig: {
    secret: '1q5cYpNHmjIwwfXBxnce3vAi1bfwy4KeM1dzpdSGvjuGkGDfjw9mml11aOkzC',
    signOptions: { expiresIn: '24h' },
  },
  globalPrefix: 'mythaistar',
  swaggerConfig: {
    swaggerTitle: 'My Thai Star',
    swaggerDescription: 'API Documentation',
    swaggerVersion: '0.0.1',
    swaggerBasepath: 'mythaistar/services/rest',
  },
  clientUrl: 'localhost:4200',
  mailerConfig: {
    mailOptions: {
        streamTransport: true,
        newline: 'windows',
      },
      // {
      // host: 'localhost',
      // port: 1025,
      // secure: false,
      // tls: {
      //   rejectUnauthorized: false,
      // },
    // },
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
    type: 'sqlite',
    database: ':memory:',
    synchronize: false,
    migrationsRun: true,
    logging: true,
    entities: ['./dist/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/default/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
  },
};

export default def;
