const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;


const userFieldMapping = {
  usernameField: 'login',
  passwordField: 'pswd',
};


exports.initPassport = (connector) => {
  const credentialsVerifier = (username, password, done) => {
    const validUser = connector.verifyCredentials(username, password);
    if (!validUser) {
      return done(null, false, { message: 'Incorrect credentials.' });
    }
    return done(null, validUser);
  };

  passport.serializeUser((user, done) => {
    done(null, user.login);
  });

  passport.deserializeUser((login, done) => {
    const user = connector.getUser(login);
    done(null, user);
  });

  passport.use(new LocalStrategy(userFieldMapping, credentialsVerifier));
  passport.use(new BasicStrategy(userFieldMapping, credentialsVerifier));

  return passport;
};
