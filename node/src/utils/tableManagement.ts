import { CronJob } from 'cron';
import * as dbtypes from '../model/database';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as business from '../logic';
import { JobDictionary, IdDateDictionary } from '../model/dictionaries';

export class TableCron {
    private jobs: JobDictionary = {}; // dict, key: date -> value: array of id
    private ids: IdDateDictionary = {}; // dict, key: id -> value: date

    public constructor() {
        this.loadAllJobs();
        this.startJob();
    }

    public loadAllJobs = () => {
        business.getAllInvitedBookings()
            .then((value) => {
                value.forEach((elem) => {
                    this.registerInvitation(elem.id, elem.bookingDate);
                });
            });
    }

    public startJob = () => {
        new CronJob('00 * * * * *', () => {
            const p = new Promise<void>(async (resolve, reject) => {
                const date = moment().set('second', 0).set('millisecond', 0).add(1, 'hour').toJSON();
                const list = this.jobs[date];
                if (list !== undefined) {
                    for (const tok of list) {
                        const assist = await business.getAssistansForInvitedBooking(tok);
                        const table = await business.getFreeTable(date, assist);

                        if (table !== 'error') {
                            const r = await business.updateBookingWithTable(tok, table);
                            if (r) {
                                console.error('Error in operation updateBookingWithTable(' + tok + ', ' + table + ')');
                            } else {
                                console.log('Table assigned for: ' + tok);
                            }
                        } else {
                            console.error('There are no more free tables');
                        }
                    }
                    resolve();
                } else{
                    resolve();
                }
            }).then(() => {

            });
        }, () => { }, true);
    }

    public registerInvitation = (id: string, date: string)  => {
        if (this.jobs[date] === undefined) {
            this.jobs[date] = [id];
        } else {
            this.jobs[date].push(id);
        }

        this.ids[id] = date;
    }

    public unregisterInvitation(id: string) {
        const idList: string[] = this.jobs[this.ids[id]];

        if (idList.length === 1) {
            delete this.jobs[this.ids[id]];
        } else {
            const idx = idList.indexOf(id);
            if (idx !== -1) {
                idList.splice(idx, 1);
            }
        }
    }

    public updateJob(id: string, newDate: string) {
        this.unregisterInvitation(id);
        this.registerInvitation(id, newDate);
    }
}
