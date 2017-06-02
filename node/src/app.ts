import { ListDeadLetterSourceQueuesRequest } from 'aws-sdk/clients/sqs';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as morgan from 'morgan';

import * as dishes from './routes/dishmanagement';
// import * as mailer from './routes/mailmanagement';
import * as order from './routes/ordermanagement';
import * as booking from './routes/bookingmanagement';
import * as config from './config';

import { TableCron } from './utils/tableManagement';
import { CustomRequest } from './model/interfaces';
import { findUser } from './logic';

export const app = express();
const cronT = new TableCron();

app.set('port', process.env.PORT || config.PORT || 8080);
app.set('superSecret', config.secret);
app.disable('x-powered-by');

app.use(cors());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req: CustomRequest, res, next) => {
  req.tableCron = cronT;
  next();
});

// TODO: declarar esta funcion por algun lado y solo usarla cuando se requiera autenticacion
// route middleware to verify a token
// app.use((req: ICustomRequest, res, next) => {

//   // check header or url parameters or post parameters for token
//   const token = req.headers['x-access-token'];

//   // decode token
//   if (token) {

//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), (err: any, decoded: any) => {
//       req.user = err ? undefined : decoded;
//     });

//   } else {
//     req.user = undefined;
//   }

//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * API routes
 */
app.use('/mythaistar/services/rest/dishmanagement', dishes.router);
app.use('/mythaistar/services/rest/ordermanagement', order.router);
app.use('/mythaistar/services/rest/bookingmanagement', booking.router);

// TODO
// app.post('/authenticate', (req, res) => {

//   // find the user
//   findUser(req.body.name).catch((err) => {throw err; }).then((user) => {
//     if (!user || user.length === 0) {
//       res.json({ success: false, message: 'Authentication failed. User not found.' });
//     } else if (user) {

//       // check if password matches
//       if (user[0].password !== req.body.password) {
//         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//       } else {

//         // if user is found and password is right
//         // create a token
//         const token = jwt.sign(user[0], app.get('superSecret'), {
//           expiresIn: '24h', // expires in 24 hours
//         });

//         // return the information including token as JSON
//         res.json({
//           success: true,
//           message: 'Enjoy your token!',
//           token,
//         });
//       }

//     }

//   });
// });

// error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).json({ message: 'Not Found'});
});

app.listen(app.get('port'), () => {
    console.log('MyThaiStar server listening on port ' + app.get('port'));
});
