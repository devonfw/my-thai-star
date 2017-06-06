import { CronJob } from 'cron';

export interface JobDictionary {
    [index: string]: [CronJob, string[]];
}

export interface IdDateDictionary {
    [index: string]: string;
}