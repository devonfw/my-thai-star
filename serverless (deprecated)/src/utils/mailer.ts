import { MailType, mailConfig, emailAPIaddr } from '../config';
import { EmailContent } from '../model/interfaces';
import * as request from 'superagent';

export class Mailer {
    public constructor() {

    }

    public static sendEmail(config: EmailContent) {
        request.post(emailAPIaddr + '/api/Email')
            .set('Accept', 'application/json')
            .send(config)
            .end((err, res) => {
                if (err || res.body === false) {
                    console.error(err || 'false');
                }
            });
    }
}
