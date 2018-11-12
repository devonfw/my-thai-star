const crypto = require('crypto');


const randomValueHex = length =>
        crypto.randomBytes(Math.ceil(length / 2))
          .toString('hex') // convert to hexadecimal format
          .slice(0, length);   // return required number of characters


exports.Reservations = class Reservations {
  constructor({ connector, mailer }) {
    this.connector = connector;
    this.mailer = mailer;
  }

  getById(id) {
    return this.connector.getReservation(id);
  }

  getAll() {
    return this.connector.getReservations();
  }

  addParticipant(reservationId, userEmail) {
    return this.connector.addParticipant(reservationId, userEmail);
  }

  create(inReservation, owner) {
    const newReservation = this.connector.createReservation(inReservation, owner);
    this.connector.addReservationForUser(newReservation.owner, newReservation.id);
    newReservation.participants
      .map(email => this.connector.createInvitation(newReservation.id, email, randomValueHex(64)))
      .forEach((invitation) => {
        this.connector.addInvitation(newReservation.id, invitation.id);
        this.mailer.sendInvitation(newReservation, invitation);
      });
    this.mailer.sendConfirmation(newReservation, owner);

    return newReservation;
  }

  cancel(reservationId) {
    const reservation = this.connector.cancelReservation(reservationId);

    reservation.invitations
      .map(invitationId => this.connector.cancelInvitation(invitationId));
    this.mailer.sendCancellation(reservation);
  }
};

exports.Invitations = class Invitations {
  constructor({ connector, mailer }) {
    this.connector = connector;
    this.mailer = mailer;
  }

  getById(id) {
    return this.connector.getInvitation(id);
  }

  getByToken(token) {
    return this.connector.getInvitationByToken(token);
  }

  getAll() {
    return this.connector.getInvitations();
  }

  reject(invitationToken) {
    const invitation = this.connector.rejectInvitation(invitationToken);
    if (invitation && invitation.status !== 'CANCELLED') {
      const reservation = this.connector.getReservation(invitation.reservation);
      this.mailer.sendRejection(reservation, this.connector.getUser(reservation.owner), invitation.invited);
    }
    return invitation;
  }


  accept(invitationToken) {
    const invitation = this.connector.acceptInvitation(invitationToken);
    if (invitation && invitation.status !== 'CANCELLED') {
      const reservation = this.connector.getReservation(invitation.reservation);
      this.mailer.sendAcceptance(reservation, this.connector.getUser(reservation.owner), invitation.invited);
    }
    return invitation;
  }
};

exports.Users = class Users {
  constructor({ connector }) {
    this.connector = connector;
  }

  getByLogin(login) {
    return this.connector.getUser(login);
  }

  getByEmail(email) {
    return this.connector.getUserByEmail(email) || {
      email,
      login: 'Anonymous',
    };
  }

  getAll() {
    return this.connector.getUsers();
  }

  create(login, email, pswd) {
    return this.connector.createUser(login, email, pswd);
  }
};


exports.Dishes = class Dishes {
  constructor({ connector }) {
    this.connector = connector;
  }

  get(id) {
    return this.connector.getDish(id);
  }

  getAll() {
    return this.connector.getDishes();
  }

  getRange(sliceIndex, count) {
    return this.getAll().slice(sliceIndex, sliceIndex + count);
  }

  getCount() {
    return this.getAll().length;
  }

  findIndex(id) {
    return this.getAll().indexOf(this.get(id));
  }

};


exports.Ingredients = class Ingredients {
  constructor({ connector }) {
    this.connector = connector;
  }

  get(id) {
    return this.connector.getIngredient(id);
  }

};
