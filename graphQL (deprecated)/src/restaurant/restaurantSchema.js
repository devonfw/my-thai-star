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
        CANCELLED
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
        token: String!
        reservation: Reservation!
        status: InvitationStatus!
        invited: User!
    }


  enum DishCategory {
        STARTER
        MAIN
        DESSERT
        VEGGY
        VEGAN
    } 

    type Dish {
        id: Int!
        name: String!
        description: String!
        image: String!
        category: [DishCategory]
        price: Float!
        rating: Float
        likes: Int
        ingredients: [Ingredient]
    }


    type Ingredient {
        id: Int!
        name: String!
        description: String!
        image: String!
        price: Float
    }


`];

exports.resolvers = {
  User: {
    friends(root, args, context) {
      return root.friends.map(login => context.Users.getByLogin(login));
    },
    reservations(root, args, context) {
      return root.reservations.map(id => context.Reservations.getById(id));
    },
  },
  Reservation: {
    owner(root, args, context) {
      return context.Users.getByLogin(root.owner);
    },
    participants(root, args, context) {
      return root.participants.map(email => context.Users.getByEmail(email));
    },
    invitations(root, args, context) {
      return root.invitations.map(id => context.Invitations.getById(id));
    },
  },
  Invitation: {
    reservation(root, args, context) {
      return context.Reservations.getById(root.reservation);
    },
    invited(root, args, context) {
      return context.Users.getByEmail(root.invited);
    },
  },
  Dish: {
    ingredients(root, args, context) {
      return root.ingredients.map(id => context.Ingredients.get(id));
    },
  },
  Ingredient: {
  },

};
