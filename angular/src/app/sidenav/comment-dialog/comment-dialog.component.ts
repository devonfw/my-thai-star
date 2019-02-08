import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

/* @export
 * @class CommentDialogComponent
 */
@Component({
  selector: 'public-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss'],
})
export class CommentDialogComponent {
  /* Creates an instance of CommentDialogComponent.
   * @param {MatDialogRef<CommentDialogComponent>} dialog
   * @memberof CommentDialogComponent
   */
  constructor(private dialog: MatDialogRef<CommentDialogComponent>) {}

  /* @param {string} comment
   * @memberof CommentDialogComponent
   */
  sendComment(comment: string): void {
    this.dialog.close(comment);
  }
}
