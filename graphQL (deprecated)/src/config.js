module.exports = {
  port: 4000,
  hostname: 'localhost',
  prodMode: false,
  endpoints: {
    graphql: '/graphql',
    graphiql: '/graphiql',
  },
  session: {
    cookie: { maxAge: 60000 },
    secret: 'mySecretSaltForHash',
    resave: false,
    saveUninitialized: false,
  },
};
