const { find, includes, max, map } = require('lodash');

// --- static storage with some initial data for tests ---

const users = [{
  email: 'jefi@honor-8.com',
  login: 'user1',
  pswd: 'user1',
  friends: ['user2'],
  reservations: [1, 2],
}, {
  email: 'tehi@lenovog4.com',
  login: 'user2',
  pswd: 'user2',
  friends: [],
  reservations: [],
}];


const reservations = [{
  id: 1,
  name: 'First test reservation',
  type: 'ACTIVE',
  owner: 'user1',
  date: '13-04-2017',
  time: '10:30',
  participants: ['jefi@honor-8.com', 'externalUser@test.com'],
  invitations: [],
}, {
  id: 2,
  name: 'Second test reservation',
  type: 'NEW',
  owner: 'user1',
  date: '20-04-2017',
  time: '10:30',
  participants: [],
  invitations: [],
}];

const invitations = [{
  id: 1,
  reservation: 1,
  status: 'PENDING',
  invited: 'tehi@lenovog4.com',
}, {
  id: 2,
  reservation: 1,
  status: 'PENDING',
  invited: 'externalUser@test.com',
}];


const dishes = [{
  id: 1,
  name: 'Pad Thai',
  description: 'Pad Thai description',
  image: 'http://todo.link',
  category: ['MAIN'],
  price: '8.50',
  rating: '4.4',
  likes: 10,
  ingredients: [1, 3],
}, {
  id: 2,
  name: 'Curry Rice',
  description: 'Curry Rice description',
  image: 'http://todo.link',
  category: ['MAIN'],
  price: '5.50',
  rating: '4.1',
  likes: 10,
  ingredients: [2],
}, {
  id: 3,
  name: 'Pad Thai 2',
  description: 'Pad Thai 2 description',
  image: 'http://todo.link',
  category: ['MAIN'],
  price: '8.50',
  rating: '4.4',
  likes: 10,
  ingredients: [1, 3],
}, {
  id: 4,
  name: 'Curry Rice 2',
  description: 'Curry Rice 2 description',
  image: 'http://todo.link',
  category: ['MAIN'],
  price: '5.50',
  rating: '4.1',
  likes: 10,
  ingredients: [2],
}];


const ingredients = [{
  id: 1,
  name: 'noodle',
  description: 'Noodle description',
  image: 'http://todo.link',
  price: '2.5',
}, {
  id: 2,
  name: 'rice',
  description: 'Rice description',
  image: 'http://todo.link',
  price: '2',
}, {
  id: 3,
  name: 'chicken',
  description: 'Chicken description',
  image: 'http://todo.link',
  price: '3',
}];


function* idSequence(initial) {
  let i = initial;
  while (true) { yield i++; } // eslint-disable-line no-constant-condition, no-plusplus
}


const resIdGen = idSequence(max(map(reservations, 'id')) + 1);
const invIdGen = idSequence(max(map(invitations, 'id')) + 1);


const removeSensitiveData = (user) => {
  if (!user) {
    return null;
  }
  const safeUser = Object.assign({}, user);
  safeUser.pswd = undefined;
  return safeUser;
};


// --- storage public API ---

exports.storage = {

    // -----------    User    -----------

  getUser(searchLogin) {
    return removeSensitiveData(find(users, { login: searchLogin }));
  },
  getUserByEmail(searchEmail) {
    return removeSensitiveData(find(users, { email: searchEmail }));
  },
  getUsers() {
    return users.map(removeSensitiveData);
  },
  createUser(login, email, pswd) {
    const newUser = { login, email, pswd, reservations: [], friends: [] };
    users.push(newUser);
    return newUser;
  },
  addUserFriend(userLogin, friendEmail) {
    const updatedUser = this.getUser(userLogin);
    const friendUser = this.getUserByEmail(friendEmail);
    if (!includes(updatedUser.friends, friendUser.login)) {
      updatedUser.friends.push(friendUser.login);
    }
    return updatedUser;
  },
  addReservationForUser(userLogin, reservationId) {
    const updatedUser = this.getUser(userLogin);
    if (!includes(updatedUser.reservations, reservationId)) {
      updatedUser.reservations.push(reservationId);
    }
    return updatedUser;
  },

    // -----------    Reservation    -----------

  getReservation(searchId) {
    return find(reservations, { id: searchId });
  },
  getReservations() {
    return reservations;
  },
  addParticipant(reservationId, userEmail) {
    const reservation = this.getReservation(reservationId);
    if (!includes(reservation.participants, userEmail)) {
      reservation.participants.push(userEmail);
    }
    return reservation;
  },
  addInvitation(reservationId, invitationId) {
    const reservation = this.getReservation(reservationId);
    if (!includes(reservation.invitations, invitationId)) {
      reservation.invitations.push(invitationId);
    }
    return reservation;
  },
  createReservation(inReservation, owner) {
    const newReservation = Object.assign({}, {
      id: resIdGen.next().value,
      owner: owner.login,
      type: 'NEW',
      invitations: [],
      participants: [],
    }, inReservation);
    reservations.push(newReservation);
    return newReservation;
  },
  cancelReservation(reservationId) {
    const reservation = this.getReservation(reservationId);
    reservation.type = 'CANCELLED';
    return reservation;
  },


    // -----------    Invitation    -----------

  getInvitation(searchId) {
    return find(invitations, { id: searchId });
  },
  getInvitationByToken(searchToken) {
    return find(invitations, { token: searchToken });
  },
  getInvitations() {
    return invitations;
  },
  createInvitation(reservationId, invitedLogin, token) {
    const newInvitation = {
      id: invIdGen.next().value,
      token,
      reservation: reservationId,
      invited: invitedLogin,
      status: 'PENDING',
    };
    invitations.push(newInvitation);
    return newInvitation;
  },
  rejectInvitation(invitationToken) {
    const invitation = this.getInvitationByToken(invitationToken);
    if (!invitation) {
      return null;
    }
    if (invitation.status !== 'CANCELLED') {
      invitation.status = 'REJECTED';
    }
    return invitation;
  },
  cancelInvitation(invitationId) {
    const invitation = this.getInvitation(invitationId);
    if (!invitation) {
      return null;
    }
    invitation.status = 'CANCELLED';
    return invitation;
  },
  acceptInvitation(invitationToken) {
    const invitation = this.getInvitationByToken(invitationToken);
    if (!invitation) {
      return null;
    }
    if (invitation.status !== 'CANCELLED') {
      invitation.status = 'ACCEPTED';
    }
    return invitation;
  },

    // -----------    Dish    -----------

  getDish(searchId) {
    return find(dishes, { id: searchId });
  },

  getDishes() {
    return dishes;
  },


    // -----------    Ingredient    -----------

  getIngredient(searchId) {
    return find(ingredients, { id: searchId });
  },

  verifyCredentials(username, password) {
    const matchedUser = find(users, { login: username });
    if (!matchedUser || matchedUser.pswd !== password) {
      return null;
    }
    return matchedUser;
  },

};
