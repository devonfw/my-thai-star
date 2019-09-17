import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { CommentAlertComponent } from '../comment-alert/comment-alert.component';
import { WindowService } from '../../../core/window/window.service';
import { map } from 'lodash';
import {Order} from 'app/sidenav/models/order.model';

@Component({
  selector: 'public-sidenav-order',
  templateUrl: './sidenav-order.component.html',
  styleUrls: ['./sidenav-order.component.scss'],
})
export class SidenavOrderComponent implements OnInit {
  extras: string;
  @Input() order: Order;
  @Input() price: number;
  @Output() orderIncreased = new EventEmitter<Order>();
  @Output() orderDecreased = new EventEmitter<Order>();
  @Output() orderRemoved = new EventEmitter<Order>();
  @Output() commentRemoved = new EventEmitter<Order>();
  @Output() commentAdded = new EventEmitter<Order>();

  constructor(
    public dialog: MatDialog,
    public window: WindowService,
  ) {}

  ngOnInit(): void {
    this.extras = map(this.order.order.extras, 'name').join(', ');
  }

  calculateOrderPrice(): number {
    return (this.order.order.orderLine.amount * (this.order.order.dish.price + this.order.order.extras.reduce((t, e) => t + e.price, 0 )));
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
      data: this.order.order.orderLine.comment,
    });
  }

  addComment(): void {
    const dialogRef: MatDialogRef<CommentDialogComponent> = this.dialog.open(
      CommentDialogComponent,
    );
    dialogRef.afterClosed().subscribe((content: string) => {
      const order = {
        id: this.order.order.dish.id + (this.order.order.extras.map((e) => e.id)).join(''),
        order: {
          dish: this.order.order.dish,
          orderLine: {
            amount: this.order.order.orderLine.amount,
            comment: content,
          },
          extras: this.order.order.extras
        }
      };
      this.commentAdded.emit(order);
    });
  }
}
