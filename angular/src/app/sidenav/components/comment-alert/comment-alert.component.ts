import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-alert',
  templateUrl: './comment-alert.component.html',
  styleUrls: ['./comment-alert.component.scss'],
})
export class CommentAlertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: string) {}
}
