const transporter = require('./transport');

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
        It looks like ${reservation.owner} invited you for a meal. There are others who might join you: ${reservation.participants}.
        We hope to see you in My Thai Star!`,
        // HTML body
        html:`<p>Hey!</p>
        <p>It looks like ${reservation.owner} invited you for a meal. There are others who might join you: ${reservation.participants}.</p>
        <p>We hope to see you in My Thai Star!</p>`
    };

    send(invitationMsg);
}

exports.sendConfirmation = (reservation, participant) => {
    const confirmationMsg = {
        from: msgFrom,
        to: `${reservation.owner}`,
        subject: 'My Thai Star - reservation confirmed', 
        // plaintext body
        text: ``,
        // HTML body
        html:``
    };

    send(confirmationMsg);
}

exports.sendRejection = (reservation, participant) => {
    const rejectionMsg = {
        from: msgFrom,
        to: `${reservation.owner}`,
        subject: 'My Thai Star - reservation confirmed', 
        // plaintext body
        text: ``,
        // HTML body
        html:``
    };

    send(rejectionMsg);
}

exports.sendCancellation = (reservation) => {
    const cancellationMsg = {
        from: msgFrom,
        to: `${reservation.participants}`,
        subject: 'My Thai Star - reservation cancelled', 
        // plaintext body
        text: ``,
        // HTML body
        html:``
    };

    send(cancellationMsg);
}
