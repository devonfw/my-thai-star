exports.schema = [`

    # Public user representation, should not contain a pswd etc.
    type User {
        email: String!
        login: String!
        friends: [User!]
        reservations: [Reservation!]
    }

    enum ReservationType {
        NEW
        ACTIVE
        CANCELED
    }   

    type Reservation {
        id: Int!
        name: String!
        type: ReservationType!
        owner: User
        date: String!
        time: String!
        participants: [User]
    }

    input ReservationInput {
        name: String!
        date: String!
        time: String!
        participants: [String!]
    }
`];

exports.resolvers = {
  User: {
      reservations(root, {id}, context){
          return root.reservations.map((id) => context.Reservations.getById(id));
      },
  },
  Reservation: {
      owner(root, {id}, context){
          return context.Users.getByLogin(root.owner);
      },
      participants(root, {id}, context){
          return root.participants.map((login) => context.Users.getByLogin(login));
      }
  },
};