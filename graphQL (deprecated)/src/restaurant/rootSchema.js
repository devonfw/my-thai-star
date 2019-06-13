const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const { schema, resolvers } = require('./restaurantSchema');
const pagingSchemaFactory = require('./pagingSchemaFactory');


// TODO: At some point of time remove queries that allow access to data
// not owned by the user (or add some roles and check privileges)
const rootSchema = [`
  type Query {
    # Hello World to confirm that graphQL works fine
    hello:String
    
    users: [User]
    user(login:String!): User
    currentUser: User

    reservations: [Reservation]
    reservation(id:Int!): Reservation  

    invitations: [Invitation]
    invitation(id:Int!): Invitation  

    dishes: [Dish]
    dishesPaginated(first:Int, after:String): DishPage


  }

  type Mutation {
    addUser(login:String!, email:String!, pswd:String!):User
    inviteFriend (reservationId: Int!, userEmail: String!): Reservation
    createReservation(reservation: ReservationInput!):Reservation
  }
  
`];

const rootResolvers = {
  Query: {
    hello() {
      return 'World';
    },


    users(root, args, context) {
      return context.Users.getAll();
    },
    user(root, { login }, context) {
      return context.Users.getByLogin(login);
    },
    currentUser(root, args, context) {
      return context.currentUser || null;
    },

    reservations(root, args, context) {
      return context.Reservations.getAll();
    },
    reservation(root, { id }, context) {
      return context.Reservations.getById(id);
    },

    invitations(root, args, context) {
      return context.Invitations.getAll();
    },
    invitation(root, { id }, context) {
      return context.Invitations.getById(id);
    },

    dishes(root, args, context) {
      return context.Dishes.getAll();
    },
    dishesPaginated: pagingSchemaFactory.buildQueryResolver('Dishes'),

  },
  Mutation: {
    addUser(_, { login, email, pswd }, context) {
      return context.Users.create(login, email, pswd);
    },
    inviteFriend(_, { reservationId, userEmail }, context) {
      return context.Reservations.addParticipant(reservationId, userEmail);
    },
    createReservation(_, { reservation }, context) {
      return context.Reservations.create(reservation, context.currentUser);
    },
  },
};

const DishSchema = pagingSchemaFactory.buildSchema('Dish');

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const restaurantSchema = [...rootSchema, ...schema, ...DishSchema.schema];
const restaurantResolvers = merge(rootResolvers, resolvers, DishSchema.resolvers);


const executableSchema = makeExecutableSchema({
  typeDefs: restaurantSchema,
  resolvers: restaurantResolvers,
});

module.exports = executableSchema;
