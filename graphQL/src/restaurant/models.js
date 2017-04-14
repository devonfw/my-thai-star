exports.Reservations = class Reservations {
  constructor({ connector }) {
    this.connector = connector;
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
    return this.connector.createReservation(inReservation, owner);
  }

}

exports.Users = class Users {
  constructor({ connector }) {
    this.connector = connector;
  }

  getByLogin(login) {
    return this.connector.getUser(login);
  }

  getAll(){
    return this.connector.getUsers();
  }

  create(login, email){
    return this.connector.createUser(login, email);
  }
}