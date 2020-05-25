import { join } from 'path';
import { Config } from '../app/shared/model/config/config.model';

const def: Config = {
  isDev: true,
  host: 'localhost',
  port: 8081,
  clientUrl: 'localhost:4200',
  globalPrefix: 'mythaistar',
  loggerConfig: {
    console: true,
    errorLogFile: './logs/error.log',
    generalLogFile: './logs/general.log',
    loggerLevel: 'info',
  },
  database: require(join(__dirname, '../../ormconfig.json')),
  mailerConfig: {
    mailOptions: {
      //   streamTransport: true,
      //   newline: 'windows',
      // },
      host: 'localhost',
      port: 1025,
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
          func: (value: boolean): string => (value ? 'accepted' : 'declined'),
        },
        {
          name: 'formatDate',
          func: (value: Date): string => value.toLocaleString(),
        },
        {
          name: 'toNumber',
          func: (value: any): number => Number(value),
        },
      ],
    },
  },
  swaggerConfig: {
    swaggerTitle: 'My Thai Star',
    swaggerDescription: 'API Documentation',
    swaggerVersion: '0.0.1',
  },
  jwtConfig: { secret: 'SECRET', signOptions: { expiresIn: '24h' } },
};

export default def;
