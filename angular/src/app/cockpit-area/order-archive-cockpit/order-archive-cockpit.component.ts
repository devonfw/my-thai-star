import { Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-order-archive-cockpit',
  templateUrl: './order-archive-cockpit.component.html',
  styleUrls: ['./order-archive-cockpit.component.scss']
})
export class OrderArchiveCockpitComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
