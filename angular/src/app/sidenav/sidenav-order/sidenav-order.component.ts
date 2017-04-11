import { SidenavSharedServiceService } from '../shared/sidenav-shared-service.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidenav-order',
  templateUrl: './sidenav-order.component.html',
  styleUrls: ['./sidenav-order.component.scss']
})
export class SidenavOrderComponent {

  @Input('order') order: any;
  @Output('removeOrder') removeEmitter = new EventEmitter();

  constructor(private sidenav: SidenavSharedServiceService) {

  }

  removeComment(): void {
    alert("comment removed");
  }

  addComment(): void {
    alert("comment added");
  }

  increaseOrder(): void {
    this.sidenav.increaseOrder(this.order.id);
  }

  decreaseOrder(): void {
    this.sidenav.decreaseOrder(this.order.id);
    if (this.order.number < 1) {
      this.removeEmitter.emit();
    }
  }

  removeOrder(): void {
    this.sidenav.removeOrder(this.order.id);
    this.removeEmitter.emit();
  }

}
