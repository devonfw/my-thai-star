import { ListDeadLetterSourceQueuesRequest } from 'aws-sdk/clients/sqs';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';

import * as dishes from './routes/dishmanagement';
// import * as mailer from './routes/mailmanagement';
import * as order from './routes/ordermanagement';
import * as booking from './routes/bookingmanagement';
import * as config from './config';

import { TableCron } from './utils/tableManagement';
import { Authentication } from './utils/authentication';
import { CustomRequest } from './model/interfaces';

export const app = express();
const cronT = new TableCron();
const auth = new Authentication(process.env.SECRET || config.secret);

app.set('port', process.env.PORT || config.PORT || 8080);
app.disable('x-powered-by');

app.use(cors({
  origin: config.frontendURL,
  credentials: true,
  exposedHeaders: 'Authorization',
}));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
  next();
});

app.use((req: CustomRequest, res, next) => {
  req.tableCron = cronT;
  next();
});
app.use(auth.registerAuthentication);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Securized routes
 */
app.use('/mythaistar/services/rest/ordermanagement/v1/order/search', auth.securizedEndpoint('WAITER'));
app.use('/mythaistar/services/rest/ordermanagement/v1/order/filter', auth.securizedEndpoint('WAITER'));
app.use('/mythaistar/services/rest/bookingmanagement/v1/booking/search', auth.securizedEndpoint('WAITER'));

/**
 * API routes
 */
app.use('/mythaistar/services/rest/dishmanagement', dishes.router);
app.use('/mythaistar/services/rest/ordermanagement', order.router);
app.use('/mythaistar/services/rest/bookingmanagement', booking.router);
app.post('/mythaistar/login', auth.auth);
app.get('/mythaistar/services/rest/security/v1/currentuser/', auth.getCurrentUser);

// error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(app.get('port'), () => {
  console.log('MyThaiStar server listening on port ' + app.get('port'));
});
