import { SidenavService } from '../shared/sidenav.service';
import { PriceCalculatorService } from '../shared/price-calculator.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { ExtraView, OrderView } from '../../shared/viewModels/interfaces';
import { filter } from 'lodash';

@Component({
  selector: 'public-sidenav-order',
  templateUrl: './sidenav-order.component.html',
  styleUrls: ['./sidenav-order.component.scss'],
})
export class SidenavOrderComponent implements OnInit {

  @Input('order') order: OrderView;
  @Output('removeOrder') removeEmitter: EventEmitter<any> = new EventEmitter();
  extras: string;

  constructor(private sidenav: SidenavService,
              public dialog: MdDialog,
              private _dialogService: TdDialogService,
              private calculator: PriceCalculatorService,
  ) {}

  ngOnInit(): void {
    this.extras = filter(this.order.extras, (extra: ExtraView) => extra.selected)
                  .reduce((total: string, extra: ExtraView): string => total + ' ' + extra.name + ',', '')
                  .slice(0, -1);
 }

  removeComment(): void {
    this.order.comment = undefined;
  }

  addComment(): void {
    let dialogRef: MdDialogRef<CommentDialogComponent> = this.dialog.open(CommentDialogComponent);
    dialogRef.afterClosed().subscribe((result: string) => {
      this.order.comment = result;
    });
  }

  increaseOrder(): void {
    this.sidenav.increaseOrder(this.order);
  }

  decreaseOrder(): void {
    this.sidenav.decreaseOrder(this.order);
    if (this.order.amount < 1) {
      this.removeEmitter.emit(this.order);
    }
  }

  removeOrder(): void {
    this.sidenav.removeOrder(this.order); // Remark - why handling here is not consistient with the one above?
                                          // Do we need both, removal via service and emmiting an event?
    this.removeEmitter.emit(this.order);
  }

  calculateOrderPrice(): number {
    return this.calculator.getPrice(this.order);
  }

  openCommentDialog(): void {
    this._dialogService.openAlert({
      message: this.order.comment,
      title: 'Comment',
      closeButton: 'Close',
    });
  }

}
