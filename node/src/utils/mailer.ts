import * as nodemailer from 'nodemailer';
import * as pug from 'pug';
import { MailType, mailConfig } from '../config';
import { EmailContent } from '../model/interfaces';
import * as superagent from 'superagent';

export class Mailer {
    private transporter: any;
    public constructor( private service?: string, private user?: string, private password?: string) {
        if (mailConfig === MailType.normal.valueOf()) {
            // create reusable transporter object using the default SMTP transport
            this.transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'my.thai.star.devonfw@gmail.com',
                    clientId: '333180016725-vr3okutqhse363j07ltr66mco8q3sd60.apps.googleusercontent.com',
                    clientSecret: 'mwh2Mw_3lkn1f12c_a7Bpsb-',
                    refreshToken: '1/m9LtXMFV8JefPyfpC1Vc7kk8mKKPiw1C4JR8ciE0wJi3rV5I5EPUA3MyDNzFtL4R',
                    accessToken: 'ya29.GlstBPATXhwBRHXstIBv3fBHxIvB2OP6BrnNb-X7M93FjKQ1UuMbFHwIDK5umDMW-u31ACRqmJPU7p00qo14QVXUxO4e2OSa7Yob0t82eaSx4tlGx0Oe2JDqcW5M',
                },
            });

            this.transporter.on('token', (token: any) => {
                console.log('A new access token was generated');
                console.log('User: %s', token.user);
                console.log('Access Token: %s', token.accessToken);
                console.log('Expires: %s', new Date(token.expires));
            });
        }
    }

    public sendEmail(config: EmailContent | null, to?: string, subject?: string, text?: string, html?: string) {
        // setup email data with unicode symbols
        const mailOptions = {
            from: this.user, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        };

        if (mailConfig === MailType.api.valueOf()) {
            
        } else if (mailConfig === MailType.mock.valueOf()) {
            console.log('Email ' + subject + ' was sended to: ' + to);
            // console.log(text || html);
        } else {
            // send mail with defined transport object
            this.transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    return console.log(error);
                }
                // console.log('Message %s sent: %s', info.messageId, info.response);
            });
        }
    }
}
