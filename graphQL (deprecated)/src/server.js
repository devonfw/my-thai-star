const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const morgan = require('morgan');

const { initPassport } = require('./passport');
const mailTransporter = require('./mail/transport');
const mailer = require('./mail/mailer');
const session = require('express-session');
const executableSchema = require('./restaurant/rootSchema');
const modelClasses = require('./restaurant/models');

const { storage } = require('./restaurant/in-memory');


exports.run = (envConfig) => {
  const config = Object.assign({}, require('./config'), envConfig); // eslint-disable-line global-require

  // TODO: pick connector - based on config, planned variants - in memory, based on mongodb (or postgresql), on top of REST API
  const connector = storage;


  // ----------  EXPRESS ----------
  const passport = initPassport(connector);
  const authenticationMiddleware = config.prodMode ? passport.authenticate('local') : (req, res, next) => next();
  const app = express();

  app.use(morgan('common'));
  app.use(bodyParser.json());
  app.use(session(config.session));

  app.use(require('connect-flash')()); // eslint-disable-line global-require
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) { return res.status(401).json({ message: 'Wrong Credentials' }); }
      return req.logIn(user, (logInErr) => {
        if (logInErr) { return next(logInErr); }
        return res.json({ message: `Welcome ${user.login}!` });
      });
    })(req, res, next);
  });


  app.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logged out sucecssfully' });
  });


  const options = { connector, mailer };

  const models = Object.keys(modelClasses)
    .reduce((modelsAcc, modelName) => {
      modelsAcc[modelName] = new modelClasses[modelName](options); // eslint-disable-line no-param-reassign
      return modelsAcc;
    }, {});

  app.use(config.endpoints.graphql, authenticationMiddleware, graphqlExpress((req) => {
    // Get the query, the same way express-graphql does it
    const query = req.query.query || req.body.query;
    if (query && query.length > 2000) {
      // Probably someone trying to send an overly expensive query - noughty users!
      throw new Error('Query too large');
    }

    // Query validation mechanism needs to be extended in future, 
    // for some inspirations check e.g.: https://developer.github.com/v4/guides/resource-limitations/

    return {
      schema: executableSchema,
      context: Object.assign({}, models, {
        currentUser: req.user,
      }),
    };
  }));



  // TODO: response filled with HTML only for demo purposes. Should be removed later on.

  app.get('/invitation/reject/:token', (req, res) => {
    const token = req.params.token;
    const invitation = models.Invitations.reject(token);

    if (invitation.status !== 'CANCELLED') {
      res.send(`
        <p>Thank you letting us know that you will <strong>not</strong> be able to join us.</p>
      `);
    } else {
      res.send(`
        <p>Reservation was already cancelled by the owner</p>
      `);
    }
  });


  app.get('/invitation/accept/:token', (req, res) => {
    const token = req.params.token;
    const invitation = models.Invitations.accept(token);

    if (invitation.status !== 'CANCELLED') {
      res.send(`
        <p>Thanks for the confirmation, see you in My Thai Star </p>
      `);
    } else {
      res.send(`
        <p>Reservation was already cancelled by the owner</p>
      `);
    }
  });

  app.get('/reservation/cancel/:id', passport.authenticate('basic'), (req, res) => {
    const id = +req.params.id;

    const reservation = models.Reservations.getById(id);
    if (reservation && req.user && req.user.login === reservation.owner) {
      models.Reservations.cancel(id);
      res.send(`
        <p>Reservation cancelled</p>
      `);
    } else {
      res.send(`
        <p>You can cancel only reservations owned by you</p>
      `);
    }
  });


  // -------------- DEV MODE ONLY --------------

  if (!config.prodMode) {
    app.use(config.endpoints.graphiql, passport.authenticate('basic'), graphiqlExpress({ endpointURL: config.endpoints.graphql }));

    // Endpoint exposed for dev purposes only to check that mailer is working properly
    app.post('/mailSenderCheck', (req, res) => {
      const email = req.body.email;

      const exampleMessage = {
        from: 'My Thai Star <my.thai.star.devonfw@gmail.com>',
          // Comma separated list of recipients
        to: `"Test" <${email}>`,
        subject: 'Nodemailer is unicode friendly ✔',
          // plaintext body
        text: 'Hello to myself!',
          // HTML body
        html: '<p><b>Hello</b> to myself <img src="cid:note@node"/></p>' +
              '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>',
      };

      mailTransporter.sendMail(exampleMessage, (error) => {
        if (error) {
          res.status(500).json({
            message: 'Error occured when sending email',
            details: error.message,
          });
          return;
        }
        res.json({ message: `Example message successfully sent to ${email}!` });
      });
    });
  }


  app.listen(config.port, config.hostname, () => {
    console.log(`Restaurant graphQL server is now running on http://${config.hostname}:${config.port}`);
  });

  return app;
};
