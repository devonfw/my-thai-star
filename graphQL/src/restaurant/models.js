exports.Reservations = class Reservations {
  constructor({ connector, mailer }) {
    this.connector = connector;
    this.mailer = mailer;
  }

  getById(id) {
    return this.connector.getReservation(id);
  }
  
  getAll(){
    return this.connector.getReservations();
  }

  addParticipant(reservationId, userLogin) {
    return this.connector.addParticipant(reservationId, userLogin);
  }

  create(inReservation, owner) {
    const newReservation = this.connector.createReservation(inReservation, owner);
    this.connector.addReservationForUser(newReservation.owner, newReservation.id);
    newReservation.participants
      .map((email) => this.connector.createInvitation(newReservation.id, email))
      .forEach((invitation) => {
        this.connector.addInvitation(newReservation.id, invitation.id);
        this.mailer.sendInvitation(newReservation, invitation);
      });

    return newReservation;
  }
}

exports.Invitations = class Invitations {
  constructor({ connector }) {
    this.connector = connector;
  }

  getById(id) {
    return this.connector.getInvitation(id);
  }
  
  getAll(){
    return this.connector.getInvitations();
  }

}

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

  getAll(){
    return this.connector.getUsers();
  }

  create(login, email){
    return this.connector.createUser(login, email);
  }
}