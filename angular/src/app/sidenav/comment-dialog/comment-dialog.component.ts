import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss'],
})
export class CommentDialogComponent {

  constructor(private dialog: MdDialogRef<CommentDialogComponent>) {}

  sendComment(comment: string): void {
    this.dialog.close(comment);
  }

}
