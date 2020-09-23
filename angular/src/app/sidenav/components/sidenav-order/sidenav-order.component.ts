import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { CommentAlertComponent } from '../comment-alert/comment-alert.component';
import { WindowService } from '../../../core/window/window.service';
import { map } from 'lodash';
import { Order } from 'app/sidenav/models/order.model';

@Component({
  selector: 'app-public-sidenav-order',
  templateUrl: './sidenav-order.component.html',
  styleUrls: ['./sidenav-order.component.scss'],
})
export class SidenavOrderComponent implements OnInit {
  extras: string;
  @Input() order: Order;
  @Output() orderIncreased = new EventEmitter<Order>();
  @Output() orderDecreased = new EventEmitter<Order>();
  @Output() orderRemoved = new EventEmitter<Order>();
  @Output() commentRemoved = new EventEmitter<Order>();
  @Output() commentAdded = new EventEmitter<Order>();

  constructor(public dialog: MatDialog, public window: WindowService) {}

  ngOnInit(): void {
    this.extras = map(this.order.details.extras, 'name').join(', ');
  }

  calculateOrderPrice(): number {
    return (
      this.order.details.orderLine.amount *
      (this.order.details.dish.price +
        this.order.details.extras.reduce((t, e) => t + e.price, 0))
    );
  }

  increaseOrder(): void {
    this.orderIncreased.emit(this.order);
  }

  decreaseOrder(): void {
    this.orderDecreased.emit(this.order);
  }

  removeOrder(): void {
    this.orderRemoved.emit(this.order);
  }

  removeComment(): void {
    this.commentRemoved.emit(this.order);
  }

  openCommentDialog(): void {
    this.dialog.open(CommentAlertComponent, {
      width: this.window.responsiveWidth(),
      data: this.order.details.orderLine.comment,
    });
  }

  addComment(): void {
    const dialogRef: MatDialogRef<CommentDialogComponent> = this.dialog.open(
      CommentDialogComponent,
    );
    dialogRef.afterClosed().subscribe((content: string) => {
      const order: Order = {
        id: this.order.id,
        details: {
          dish: this.order.details.dish,
          orderLine: {
            amount: this.order.details.orderLine.amount,
            comment: content,
          },
          extras: this.order.details.extras,
        },
      };
      this.commentAdded.emit(order);
    });
  }
}
