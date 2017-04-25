import { SidenavService } from '../shared/sidenav.service';
import { MdDialog, MdSnackBar } from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'sidenav-order',
  templateUrl: './sidenav-order.component.html',
  styleUrls: ['./sidenav-order.component.scss']
})
export class SidenavOrderComponent implements OnInit {

  @Input('order') order: any;
  @Output('removeOrder') removeEmitter = new EventEmitter();
  ingredients: string[] = [];

  constructor(private sidenav: SidenavService, public snackBar: MdSnackBar, public dialog: MdDialog) {

  }

  ngOnInit() {
    this.ingredients = _.filter(this.order.options, function(o) { return o.selected === true; });
}

  removeComment(): void {
    this.order.comment = undefined;
  }

  addComment(): void {
    let dialogRef = this.dialog.open(CommentDialogComponent);
    dialogRef.afterClosed().subscribe((result: string) => {
      this.order.comment = result;
    });
  }

  increaseOrder(): void {
    this.sidenav.increaseOrder(this.order);
  }

  decreaseOrder(): void {
    this.sidenav.decreaseOrder(this.order);
    if (this.order.number < 1) {
      this.removeEmitter.emit();
    }
  }

  removeOrder(): void {
    this.sidenav.removeOrder(this.order);
    this.removeEmitter.emit();
  }

  calculateOrderPrice(): number {
    let total = this.order.price * this.order.number;
    _.forEach(this.order.options, function(value, key) {
      if(value.selected) {
        total = total + value.price;
      }
    });
    return total;
  }

}
