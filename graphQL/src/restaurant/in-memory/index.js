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
        participants: ['user2@test.com', 'externalUser@test.com'],
        invitations:[],
    },{
        id: 2,
        name: 'Second test reservation',
        type: 'NEW',
        owner: 'user1',
        date: '20-04-2017',
        time: '10:30',
        participants: [],
        invitations:[],
    }];

const invitations = [{
        id: 1,
        reservation: 1,
        status: 'PENDING',
        invited: 'user2@test.com'
    },{
        id: 2,
        reservation: 1,
        status: 'PENDING',
        invited: 'externalUser@test.com'
    }];


function* idSequence(initial) {
  var i = initial;
  while(true)
    yield i++;
}


const resIdGen = idSequence(max(map(reservations, 'id'))+1);
const invIdGen = idSequence(max(map(invitations, 'id'))+1);

// --- storage public API ---


const removeSensitiveData = (user) =>{
    if (!user){
        return null;
    }
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
    cancelReservation(reservationId){
        const reservation = this.getReservation(reservationId);
        reservation.type = 'CANCELLED';
        return reservation;
    },


    getInvitation(searchId) {
        return find(invitations, {id: searchId});
    },
    getInvitationByToken(searchToken) {
        return find(invitations, {token: searchToken});
    },
    getInvitations(){
        return invitations;
    },
    createInvitation(reservationId, invitedLogin, token) {
        const newInvitation = {
            id: invIdGen.next().value,
            token: token,
            reservation: reservationId,
            invited: invitedLogin,
            status: 'PENDING',
        };
        invitations.push(newInvitation);
        return newInvitation;
    },
    rejectInvitation(invitationToken){
        const invitation  = this.getInvitationByToken(invitationToken);
        if (!invitation) {
            return null;
        }
        if (invitation.status !== 'CANCELLED'){
            invitation.status='REJECTED';
        }
        return invitation;
    },
    cancelInvitation(invitationId){
        const invitation  = this.getInvitation(invitationId);
        if (!invitation) {
            return null;
        }
        invitation.status='CANCELLED';
        return invitation;
    },
    acceptInvitation(invitationToken){
        const invitation  = this.getInvitationByToken(invitationToken);
        if (!invitation) {
            return null;
        }
        if (invitation.status !== 'CANCELLED'){
            invitation.status='ACCEPTED';
        }
        return invitation;
    },



    verifyCredentials(username, password){
        const matchedUser = find(users, {login: username});
        if (!matchedUser || matchedUser.pswd!=password) {
            return null;
        }
        return matchedUser;
    }
    
}