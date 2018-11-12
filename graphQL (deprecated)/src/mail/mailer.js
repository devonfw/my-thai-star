const transporter = require('./transport');
const config = require('../config');

const msgFrom = 'My Thai Star <my.thai.star.devonfw@gmail.com>';

function send(messageObj) {
  return transporter.sendMail(messageObj, (error) => {
    if (error) {
      console.error(`Error occured when sending email: ${error.message}`);
    }
  });
}


exports.sendInvitation = (reservation, invitation) => {
  const invitationMsg = {
    from: msgFrom,
    to: `${invitation.invited}`,
    subject: 'My Thai Star invitation',
        // plaintext body
    text: `Hey!
        It looks like ${reservation.owner} invited you for a meal. There are others who might join you, full list of participants: ${reservation.participants}. Will you be there?

        Accept: http://${config.hostname}:${config.port}/invitation/accept/${invitation.token}
        Reject: http://${config.hostname}:${config.port}/invitation/reject/${invitation.token}

        We hope to see you in My Thai Star!`,
        // HTML body
    html: `<p>Hey!</p>
        <p>It looks like ${reservation.owner} invited you for a meal. There are others who might join you, full list of participants: 
        <ul>
          ${reservation.participants.map(participant => ('<li>' + participant + '<li>')).join('')}
        </ul>
        Will you be there?</p>

        <a href="http://${config.hostname}:${config.port}/invitation/accept/${invitation.token}">Accept</a>
        <a href="http://${config.hostname}:${config.port}/invitation/reject/${invitation.token}">Reject</a>

        <p>We hope to see you in My Thai Star!</p>`,
  };

  send(invitationMsg);
};

exports.sendConfirmation = (reservation, owner) => {
  const confirmationMsg = {
    from: msgFrom,
    to: `${owner.email}`,
    subject: 'My Thai Star - reservation confirmation',
        // plaintext body
    text: `Thanks for making a reservation ${JSON.stringify(reservation)}. 
        
        If you would like to cancel it, please go to: http://${config.hostname}:${config.port}/reservation/cancel/${reservation.id}`,
        // HTML body
    html: `<p>Thanks for making a reservation ${JSON.stringify(reservation)}.</p>
        
        <p>If you would like to cancel it, please click <a href="http://${config.hostname}:${config.port}/reservation/cancel/${reservation.id}">here</a></p>`,
  };

  send(confirmationMsg);
};

exports.sendAcceptance = (reservation, owner, participant) => {
  const confirmationMsg = {
    from: msgFrom,
    to: `${owner.email}`,
    subject: 'My Thai Star - reservation accepted',
        // plaintext body
    text: `${participant} confirmed to join you on ${JSON.stringify(reservation)}. Invitation was accepted.`,
        // HTML body
    html: `<p>${participant} confirmed to join you on ${JSON.stringify(reservation)}. Invitation was accepted.</p>`,
  };

  send(confirmationMsg);
};

exports.sendRejection = (reservation, owner, participant) => {
  const rejectionMsg = {
    from: msgFrom,
    to: `${owner.email}`,
    subject: 'My Thai Star - reservation rejected',
        // plaintext body
    text: `It looks like ${participant} will not be able to join you on ${JSON.stringify(reservation)}. Invitation was rejected`,
        // HTML body
    html: `<p>It looks like ${participant} will not be able to join you on ${JSON.stringify(reservation)}. Invitation was rejected</p>`,
  };

  send(rejectionMsg);
};

exports.sendCancellation = (reservation) => {
  const cancellationMsg = {
    from: msgFrom,
    to: `${reservation.participants}`,
    subject: 'My Thai Star - reservation cancelled',
        // plaintext body
    text: `Reservation: ${JSON.stringify(reservation)} was cancelled by the owner`,
        // HTML body
    html: `<p>Reservation: ${JSON.stringify(reservation)} was cancelled by the owner</p>`,
  };

  send(cancellationMsg);
};
