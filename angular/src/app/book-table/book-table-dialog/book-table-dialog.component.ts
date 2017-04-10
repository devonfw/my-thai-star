import { Component } from '@angular/core';

@Component({
  selector: 'app-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss']
})
export class BookTableDialogComponent {

  sendBooking(): void {
    alert('booking sended');
  }
}
