import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cockpit-reservation-cockpit',
  templateUrl: './reservation-cockpit.component.html',
  styleUrls: ['./reservation-cockpit.component.scss'],
})
export class ReservationCockpitComponent {

  expandIcon: string = 'expand_more';

  constructor() {
     // constructor
  }

  applyFilters(filters: FormGroup): void {
    // apply the filters
  }

  clearFilters(): void {
    // clear the filters
  }

  changeExpandIcon(): void {
    this.expandIcon = (this.expandIcon === 'expand_more') ? 'expand_less' : 'expand_more';
  }
}
