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
}