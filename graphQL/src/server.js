const express = require('express');
const bodyParser = require('body-parser');
const {buildSchema} = require('graphql');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');

const executableSchema = require('./restaurant/rootSchema');
const {Users, Reservations} = require('./restaurant/models');

// TODO: configure connector, planned variants - in memory, based on mongodb (or postgresql), on top of API 
const {storage} = require('./restaurant/in-memory');


// TODO: Move config to external file
const config = {
  port: 4000,
  hostname: 'localhost',
  endpoints: {
    graphql: '/graphql',
    graphiql: '/graphiql'
  }
}


// const {
//   GraphQLObjectType,
//   GraphQLNonNull,
//   GraphQLSchema,
//   GraphQLString,
//   GraphQLList
// } = require('graphql/type');

// const helloWorldSchema =  new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: function() {
//           return 'world';
//         }
//       },
//     }
//   })
// });



// const { makeExecutableSchema } = require('graphql-tools');
// const rootTestSchema = `
//   type Query {
//     # Hello World to confirm that graphQL works fine
//     hello:String
//   } 
// `;

// const rootTestResolvers = {
//   Query: {
//     hello() {
//       return 'World';
//     },
//   }
// };

// const executableTestSchema = makeExecutableSchema({
//   typeDefs: rootTestSchema,
//   resolvers: rootTestResolvers,
// });




exports.run = () => {

  // ----------  EXPRESS ----------

  const app = express();

  app.use(config.endpoints.graphql, bodyParser.json(), graphqlExpress(req => {

    // Get the query, the same way express-graphql does it
    const query = req.query.query || req.body.query;
    if (query && query.length > 2000) {
      // Probably someone trying to send an overly expensive query - noughty users!
      throw new Error('Query too large');
    }

    const options = {connector: storage};

    return {
      schema: executableSchema,
      context: {
        // TODO: user handling 
        // user: req.session.user
        Users: new Users(options),
        Reservations: new Reservations(options)
      }
    }
  }));

  // TODO: enable only in dev mode
  app.use(config.endpoints.graphiql, graphiqlExpress({endpointURL: config.endpoints.graphql}));

  app.listen(config.port, config.hostname, () => {
    console.log(`Restaurant graphQL server is now running on http://${config.hostname}:${config.port}`);
  });

  return app;
}