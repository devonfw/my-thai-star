import { CronJob } from 'cron';

export interface JobDictionary {
    [index: string]: string[];
}

export interface IdDateDictionary {
    [index: string]: string;
}