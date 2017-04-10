import { Component } from '@angular/core';

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss']
})
export class InvitationDialogComponent {

  sendInvitation(): void {
    alert('invitation sended');
  }

}
