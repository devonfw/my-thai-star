const { find, filter } = require('lodash');

// --- static storage with some initial data for tests ---

const users = [{
        email: 'user1@test.com',
        login: 'user1',
        friends: ['user2'],
        reservations: [111, 222]
    },{
        email: 'user2@test.com',
        login: 'user2',
        friends: [],
        reservations: []
    }];


const reservations = [{
        id: 111,
        name: 'First test reservation',
        type: 'ACTIVE',
        owner: 'user1',
        participants: ['user1','user2'],
    },{
        id: 222,
        name: 'Second test reservation',
        type: 'NEW',
        owner: 'user1',
        participants: [],
    }];


// --- storage public API ---

exports.storage = {
    getUser(searchLogin) {
        return find(users, {login: searchLogin});
    },
    getUsers() {
        return users;
    },
    getReservation(searchId) {
        return find(reservations, {id: searchId});
    },
    getReservations() {
        return reservations;
    },
}