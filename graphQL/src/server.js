const express = require('express');
const bodyParser = require('body-parser');
const {buildSchema} = require('graphql');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');

const {initPassport} = require('./passport');
const mailTransporter = require('./mailTransport');
const session = require('express-session');
const executableSchema = require('./restaurant/rootSchema');
const {Users, Reservations} = require('./restaurant/models');

const {storage} = require('./restaurant/in-memory');



exports.run = (envConfig) => {

  const config = Object.assign({}, require('./config'), envConfig);

  // TODO: configure connector, planned variants - in memory, based on mongodb (or postgresql), on top of API 
  const connector = storage;
  // ----------  EXPRESS ----------


  const passport = initPassport(connector);
  const authenticationMiddleware = config.prodMode ? passport.authenticate('local') : (req, res, next) => next();
  const app = express();

  app.use(bodyParser.json()); 
  app.use(session(config.session));  
  
  app.use(require("connect-flash")());
  app.use(passport.initialize());
  app.use(passport.session());



  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return   res.status(401).json({message:"Wrong Credentials"}); }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        return res.json({message:`Welcome ${user.login}!`});
      });
    })(req, res, next);
  });


  app.get('/logout', function(req, res){
    req.logout();
    res.json({message:'Logged out sucecssfully'});
  });



  app.use(config.endpoints.graphql, authenticationMiddleware, graphqlExpress(req => {

    // Get the query, the same way express-graphql does it
    const query = req.query.query || req.body.query;
    if (query && query.length > 2000) {
      // Probably someone trying to send an overly expensive query - noughty users!
      throw new Error('Query too large');
    }

    const options = {connector};

    return {
      schema: executableSchema,
      context: {
        currentUser: req.user,
        Users: new Users(options),
        Reservations: new Reservations(options)
      }
    }
  }));


  if (!config.prodMode) {
    app.use(config.endpoints.graphiql, passport.authenticate('basic'),  graphiqlExpress({endpointURL: config.endpoints.graphql}));

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
          html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
              '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'
      };

      mailTransporter.sendMail(exampleMessage, function(error){
        if(error){
            res.status(500).json({
              message: 'Error occured when sending email',
              details: error.message,
            });
            return;
        }
        res.json({message:`Example message successfully sent to ${email}!`});
      });

    });
  }



  app.listen(config.port, config.hostname, () => {
    console.log(`Restaurant graphQL server is now running on http://${config.hostname}:${config.port}`);
  });

  return app;
}