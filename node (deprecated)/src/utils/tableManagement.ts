import { CronJob } from 'cron';
import * as dbtypes from '../model/database';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as business from '../logic';

export class TableCron {
    public constructor() {
        this.startJob();
    }

    public startJob = () => {
        new CronJob('00 * * * * *', () => {
            const p = new Promise<void>(async (resolve, reject) => {
                const date = moment().set('second', 0).set('millisecond', 0).add(1, 'hour').toJSON();
                const list = await business.getAllInvitedBookings(date);

                if (list !== undefined) {
                    for (const tok of list) {
                        const assist = await business.getAssistansForInvitedBooking(tok.id);
                        const table = await business.getFreeTable(date, assist);

                        if (table !== 'error') {
                            let err = await business.updateBookingWithTable(tok.id, table);
                            if (err) {
                                // retry 5 times
                                for (let i = 0; err && i < 5; i++) {
                                    err = await business.updateBookingWithTable(tok.id, table);
                                }

                                if (err){
                                    console.error('Error in operation updateBookingWithTable(' + tok.id + ', ' + table + ')');
                                }
                            }
                        } else {
                            // No more tables, stoping
                            reject('no more tables');
                        }
                    }
                    resolve();
                } else{
                    resolve();
                }
            }).then(() => {
                // nothing to do
            }, (err) => {

            });
        }, () => { }, true);
    }
}
