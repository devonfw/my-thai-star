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
        invitations: [Invitation]
    }

    input ReservationInput {
        name: String!
        date: String!
        time: String!
        participants: [String!]
    }


    enum InvitationStatus {
        PENDING
        ACCEPTED
        REJECTED
        CANCELLED
    } 

    type Invitation {
        id: Int!
        reservation: Reservation!
        status: InvitationStatus!
        invited: User!
    }


`];

exports.resolvers = {
  User: {
      reservations(root, args, context){
          return root.reservations.map((id) => context.Reservations.getById(id));
      },
  },
  Reservation: {
      owner(root, args, context){
          return context.Users.getByLogin(root.owner);
      },
      participants(root, args, context){
          return root.participants.map((email) => context.Users.getByEmail(email));
      },
      invitations(root, args, context){
          return root.invitations.map((id) => context.Invitations.getById(id));
      },
  },
  Invitation: {
      reservation(root, args, context){
          return context.Reservations.getById(root.reservation);
      },
      invited(root,  args, context){
          return  context.Users.getByEmail(root.invited);
      },
  },
};