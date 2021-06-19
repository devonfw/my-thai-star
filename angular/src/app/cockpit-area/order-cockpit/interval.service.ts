import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {
  interval;

  setInterval(time: number, callback: () => void) {
    this.interval = setInterval(callback, time);
  }

  clearInterval() {
    clearInterval(this.interval);
  }
}
