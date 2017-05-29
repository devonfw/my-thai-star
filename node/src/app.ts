import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import * as dishes from './routes/dishmanagement';
// import * as mailer from './routes/mailmanagement';
import * as order from './routes/ordermanagement';
import * as booking from './routes/bookingmanagement';

import * as pug from 'pug';

export const app = express();
app.set('port', process.env.PORT || 8080);
app.disable('x-powered-by');

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', (req, res, next) => {
//   res.send(pug.renderFile('./src/emails/createInvitationHost.pug', {
//     title: 'Booking',
//     name: 'Dario',
//     hostEmail: 'dario@gmail.com',
//     email: 'santos@gmail.com',
//     date: '2017/07/11',
//     hour: '20:00',
//     guest: ['santos@gmail.com', 'jose@gmail.com', 'pablo@gmail.com'],
//     urlAcept: '#',
//     urlCancel: '#',
//   }));
// });

/**
 * API routes
 */
app.use('/mythaistar/services/rest/Dishmanagement', dishes.router);
app.use('/mythaistar/services/rest/Ordermanagement', order.router);
app.use('/mythaistar/services/rest/Bookingmanagement', booking.router);

// error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send('<h1>404 - Not Found!</h1>');
});

app.listen(app.get('port'), () => {
    console.log('MyThaiStar server listening on port ' + app.get('port'));
});
