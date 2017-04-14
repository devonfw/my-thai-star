const { find, filter, includes, max, map } = require('lodash');

// --- static storage with some initial data for tests ---

const users = [{
        email: 'user1@test.com',
        login: 'user1',
        pswd: 'user1',
        friends: ['user2'],
        reservations: [1, 2]
    },{
        email: 'user2@test.com',
        login: 'user2',
        pswd: 'user2',
        friends: [],
        reservations: []
    }];


const reservations = [{
        id: 1,
        name: 'First test reservation',
        type: 'ACTIVE',
        owner: 'user1',
        date: '13-04-2017',
        time: '10:30',
        participants: ['user1','user2'],
    },{
        id: 2,
        name: 'Second test reservation',
        type: 'NEW',
        owner: 'user1',
        date: '20-04-2017',
        time: '10:30',
        participants: [],
    }];


function* idSequence(initial) {
  var i = initial;
  while(true)
    yield i++;
}


var resIdGen = idSequence(max(map(reservations, 'id'))+1);

// --- storage public API ---


const removeSensitiveData = (user) =>{
    const safeUser = Object.assign({}, user);
    safeUser.pswd = undefined;
    return safeUser;
}



exports.storage = {
    getUser(searchLogin) {
        return removeSensitiveData(find(users, {login: searchLogin}));
    },
    getUserByEmail(searchEmail) {
        return removeSensitiveData(find(users, {email: searchEmail}));
    },
    getUsers() {
        return users.map(removeSensitiveData);
    },
    createUser(login, email) {
        const newUser = {login, email};
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


    getReservation(searchId) {
        return find(reservations, {id: searchId});
    },
    getReservations() {
        return reservations;
    },
    addParticipant(reservationId, userLogin) {
        const reservationToUpdate = this.getReservation(reservationId);
        if (!includes(reservationToUpdate.participants, userLogin)) {
            reservationToUpdate.participants.push(userLogin);
        }
        return reservationToUpdate;
    },
    createReservation(inReservation, owner) {
        const newReservation = Object.assign({}, inReservation, {
            owner: owner.login,
            type: 'NEW',
            id: resIdGen.next().value,
        });
        reservations.push(newReservation);
        this.addReservationForUser(newReservation.owner, newReservation.id);
        return newReservation;
    },




    verifyCredentials(username, password){
        const matchedUser = find(users, {login: username});
        if (!matchedUser || matchedUser.pswd!=password) {
            return null;
        }
        return matchedUser;
    }
    
}