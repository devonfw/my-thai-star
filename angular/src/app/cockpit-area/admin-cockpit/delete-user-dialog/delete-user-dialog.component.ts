import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'app/core/config/config.service';
import { TranslocoService } from '@ngneat/transloco';
import { UserInfo } from 'app/shared/backend-models/interfaces';
import { AdminService } from 'app/cockpit-area/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {
  private translocoSubscription = Subscription.EMPTY;
  user: UserInfo;
  constructor(
    private translocoService: TranslocoService,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) dialogData: any,
    private configService: ConfigService,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.user = dialogData;
  }

   //string parts for SuccessBar
  stringpart1:string;
  stringpart2:string;
  stringpart3:string;

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe((event: any) => {
      this.translateSuccessBar(event);
      moment.locale(this.translocoService.getActiveLang());
    });
  }

  deleteUser(): void{
    this.adminService.deleteUser(this.user.id).subscribe( () => {
        this.openSuccessBar();
        this.dialogRef.close(this.user); 
    });
  }

  translateSuccessBar(lang: string): void {
    this.translocoSubscription = this.translocoService
      .selectTranslateObject('cockpit.admin.successBarDeleted', {}, lang)
      .subscribe((cockpitcockpitsuccessBar) => {
        this.stringpart1 = cockpitcockpitsuccessBar.stringpart1;
        this.stringpart2 = cockpitcockpitsuccessBar.stringpart2;
        this.stringpart3 = cockpitcockpitsuccessBar.stringpart3;
      });
  }
  
  openSuccessBar() {
    this._snackBar.open(`${this.stringpart1}${this.user.username}${this.stringpart2}${this.user.id}${this.stringpart3}` , 'Ok!');
  }

}
