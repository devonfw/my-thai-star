import { CronJob } from 'cron';
import * as dbtypes from '../model/database';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as bussiness from '../logic';

export class TableCron {
    private jobs: any = {}; // dict, key: date -> value: array of id
    private ids: any = {}; // dict, key: id -> value: date

    public constructor() {
        this.loadAllJobs();
    }

    public loadAllJobs(){
        bussiness.getAllInvitedBookings()
        .then((value) => {
            value.forEach((elem) => {
                this.startJob(elem.id, elem.bookingDate);
            });
        });
    }

    public startJob(id: string, date: string) {
        // console.log('Loading ' + id + ' for: ' + date);
        if (this.jobs[date] === undefined) {
            this.ids[id] = [date];
            this.jobs[date] = [new CronJob(moment(date, 'YYYY-MM-DD HH:mm:ss.SSS').subtract(1, 'hour').toDate(), () => {
                const p = new Promise<void>(async (resolve, reject) => {
                    const list = this.jobs[date][1];
                    for (const tok of list) {
                        const assist = await bussiness.getAssistansForInvitedBooking(tok);
                        const table = await bussiness.getFreeTable(date, assist);

                        if (table !== 'error') {
                            const r = await bussiness.updateBookingWithTable(tok, table);
                            if (r) {
                                console.error('Error in operation updateBookingWithTable(' + tok + ', ' + table + ')');
                            }
                        } else {
                            console.error('There are no more free tables');
                        }
                    }
                    resolve();
                }).then();
            }, () => { }, true), [id]];
        } else {
            this.jobs[date][1].push(id);
            this.ids[id] = [date];
        }
    }

    public stopJob(id: string) {
        const [job, idList]: [CronJob, string[]] = this.jobs[this.ids[id]];

        if (idList.length === 1) {
            job.stop();
            delete this.jobs[this.ids[id]];
        } else {
            const idx = idList.indexOf(id);
            if (idx !== -1) {
                idList.splice(idx, 1);
            }
        }
    }

    public updateJob(id: string, newDate: string) {
        this.stopJob(id);
        this.startJob(id, newDate);
    }
}
