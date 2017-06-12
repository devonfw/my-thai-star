import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';

import * as dishes from './routes/dishmanagement';
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
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Cors config
 */
app.use(cors({
  origin: config.frontendURL,
  credentials: true,
  exposedHeaders: 'Authorization',
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
  next();
});

/**
 * Add table cron and user to request
 */
app.use((req: CustomRequest, res, next) => {
  req.tableCron = cronT;
  next();
});
app.use(auth.registerAuthentication);

/**
 * Route for images
 */
app.use('/images', express.static('public/images'));

/**
 * Securized routes
 */
order.router.use('/v1/order/filter', auth.securizedEndpoint('WAITER'));
order.router.use('/v1/order/search', auth.securizedEndpoint('WAITER'));
booking.router.use('/v1/booking/search', auth.securizedEndpoint('WAITER'));
app.use('/mythaistar/services/rest/security/changepassword', auth.securizedEndpoint('CUSTOMER'));

/**
 * API routes
 */
app.use('/mythaistar/services/rest/dishmanagement', dishes.router);
app.use('/mythaistar/services/rest/ordermanagement', order.router);
app.use('/mythaistar/services/rest/bookingmanagement', booking.router);
app.post('/mythaistar/login', auth.auth);
app.get('/mythaistar/services/rest/security/v1/currentuser', auth.getCurrentUser);
app.post('/mythaistar/services/rest/security/changepassword', auth.changePassword);

// error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(app.get('port'), () => {
  console.log('MyThaiStar server listening on port ' + app.get('port'));
});
