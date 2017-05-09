import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import * as dishes from './routes/dishes';
import { indexGET } from './routes/index';

const app = express();
app.set('port', process.env.PORT || 8080);
app.disable('x-powered-by');

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * API routes
 */
app.use('/mythaistar/services/rest/Dishmanagement/v1/Dish/Search', dishes.router);

// error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send('<h1>404 - Not Found!</h1>');
});

app.listen(app.get('port'), () => {
    console.log('MyThaiStar server listening on port ' + app.get('port'));
});
