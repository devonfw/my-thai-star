import * as nodemailer from 'nodemailer';

class Mailer {
    private transporter: nodemailer.Transporter;
    public constructor(public service: string, public user: string, public password: string) {
        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            service: this.service,
            auth: {
                user: this.user,
                pass: this.password,
            },
        });
    }

    public sendEmail(from: string, to: string, subject: string, text?: string, html?: string) {
        // setup email data with unicode symbols
        const mailOptions = {
            from, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        };

        // send mail with defined transport object
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            // console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
}
