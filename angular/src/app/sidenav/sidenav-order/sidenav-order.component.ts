import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidenav-order',
  templateUrl: './sidenav-order.component.html',
  styleUrls: ['./sidenav-order.component.scss']
})
export class SidenavOrderComponent {

  @Input('order') order: any;

  removeComment(): void {
    alert("comment removed");
  }

  addComment(): void {
    alert("comment added");
  }

}
