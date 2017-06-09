import { MailType, mailConfig, emailAPIaddr } from '../config';
import { EmailContent } from '../model/interfaces';
import * as request from 'superagent';

export class Mailer {
    public constructor() {

    }

    public static sendEmail(config: EmailContent) {
        if (mailConfig === MailType.api.valueOf() || mailConfig === MailType.both.valueOf()) {
            request.post(emailAPIaddr + '/api/Email')
            .set('Accept', 'application/json')
            .send(config)
            .end((err, res) => {
                if (err || res.body === false){
                    console.error(err || 'false');
                }else{
                    console.log('email enviado satisfactoriamente');
                }
            });
        } else if (mailConfig === MailType.mock.valueOf() || mailConfig === MailType.both.valueOf()) {
            console.log(config);
        }
    }
}
