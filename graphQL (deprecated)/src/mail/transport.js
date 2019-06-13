const nodemailer = require('nodemailer');
const config = require('../config');

// Read more here:
// http://stackoverflow.com/questions/24098461/nodemailer-gmail-what-exactly-is-a-refresh-token-and-how-do-i-get-one
// http://masashi-k.blogspot.nl/2013/06/sending-mail-with-gmail-using-xoauth2.html


// {
//     "web": {
//         "client_id": "333180016725-vr3okutqhse363j07ltr66mco8q3sd60.apps.googleusercontent.com",
//         "project_id": "my-thai-star-graphql",
//         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//         "token_uri": "https://accounts.google.com/o/oauth2/token",
//         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//         "client_secret": "mwh2Mw_3lkn1f12c_a7Bpsb-"
//     }
// }
// https://developers.google.com/oauthplayground/?code=4/nMkCl03MF1-RbULCmF0aTeRfWo53k_eIvJVnJrmBu7o#


const productionTransportConfig = {
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: 'my.thai.star.devonfw@gmail.com',
    clientId: '333180016725-vr3okutqhse363j07ltr66mco8q3sd60.apps.googleusercontent.com',
    clientSecret: 'mwh2Mw_3lkn1f12c_a7Bpsb-',
    refreshToken: '1/m9LtXMFV8JefPyfpC1Vc7kk8mKKPiw1C4JR8ciE0wJi3rV5I5EPUA3MyDNzFtL4R',
    accessToken: 'ya29.GlstBPATXhwBRHXstIBv3fBHxIvB2OP6BrnNb-X7M93FjKQ1UuMbFHwIDK5umDMW-u31ACRqmJPU7p00qo14QVXUxO4e2OSa7Yob0t82eaSx4tlGx0Oe2JDqcW5M',
  },
};

// Watch out, might not work when in VPN!
const devTransportConfig = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    // Please setup and use your *own* account on mailtrap (or any similar provider)
    user: 'f7756655f55537',
    pass: '041276092ccf4b',
  },
};


const transporter = nodemailer.createTransport(config.prodMode ? productionTransportConfig : devTransportConfig);
console.log('SMTP Configured');


transporter.on('token', (token) => {
  console.log('A new access token was generated');
  console.log('User: %s', token.user);
  console.log('Access Token: %s', token.accessToken);
  console.log('Expires: %s', new Date(token.expires));
});

module.exports = transporter;
