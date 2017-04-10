const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const { schema, resolvers} = require('./restaurantSchema');

const rootSchema = [`
  type Query {
    # Hello World to confirm that graphQL works fine
    hello:String
    
    users: [User]
    user(login:String!): User
    currentUser: User

    reservations: [Reservation]
    reservation(id:Int!): Reservation  
  }
  
`];


//   type Mutation {
//     addFriend(
//       user: User
//       friendToAdd: String!
//     ):User
//     inviteFriend(
//       friendToInvite: String!
//     ): Reservation
//     makeReservation(
//       reservationId: Int!,
//     ): Reservation
//   }

const rootResolvers = {
  Query: {
    hello() {
      return 'World';
    },
    
    
    users(root, args, context) {
      return context.Users.getAll();
    },
    user(root, { login }, context) {
      return context.Users.getUser(login);
    },
    currentUser(root, args, context) {
      return context.user || null;
    },

    reservations(root, args, context){
      return context.Reservations.getAll();
    },
    reservation(root, {id}, context){
      return context.Reservations.getById(id);
    }

  }
};

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const restaurantSchema = [...rootSchema, ...schema];
const restaurantResolvers = merge(rootResolvers, resolvers);


const executableSchema = makeExecutableSchema({
  typeDefs: restaurantSchema,
  resolvers: restaurantResolvers,
});

module.exports = executableSchema;