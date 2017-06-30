import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../types';
import * as types from '../../src/model/interfaces';
import * as business from '../../src/logic';
import * as moment from 'moment';

oasp4fn.config({ rate: 'rate(1 minute)', enabled: true, });
export async function tableManagement(event: HttpEvent, context: Context, callback: Function) {
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

                        if (err) {
                            console.error('Error in operation updateBookingWithTable(' + tok.id + ', ' + table + ')');
                        }
                    }
                } else {
                    // No more tables, stoping
                    reject('no more tables');
                }
            }
            resolve();
        } else {
            resolve();
        }
    }).then(() => {
        // nothing to do
    }, (err) => {

    });
}