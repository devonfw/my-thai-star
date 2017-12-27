import { Component } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BookTableDialogComponent } from './book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { WindowService } from '../core/windowService/windowService.service';
import { SnackBarService } from '../core/snackService/snackService.service';
import { emailValidator } from '../shared/directives/email-validator.directive';
import { last } from 'lodash';
import { CookieService } from 'app/core/cookieservice/cookie.service';
import { AuthService } from 'app/core/authentication/auth.service';
import { LoginDataService } from 'app/backend/login/login-data-service';
import { AuthGuardService } from 'app/core/authentication/auth-guard.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'public-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
})

export class BookTableComponent {

  invitationModel: string[] = [];
  minDate: Date = new Date();

  constructor(public window: WindowService,
    public snackBarservice: SnackBarService,
              public dialog: MatDialog,
              private cookieService:CookieService,
            private authService: AuthService,
          private loginDataService: LoginDataService,
        private authguard:AuthGuardService,
      ) {
      
  }
  
 name="";
 email="";
  
prefill(){
  if(this.cookieService.getCookie("name") != ""){
    var token=this.cookieService.getCookie("name")
    if(this.name==""){
    if (JSON.parse(window.atob(token.split('.')[1])).given_name!=null){
      this.name=this.name+JSON.parse(window.atob(token.split('.')[1])).given_name[0]+". "; 
      }
    if (JSON.parse(window.atob(token.split('.')[1])).family_name!=null){
    this.name=this.name+JSON.parse(window.atob(token.split('.')[1])).family_name; 
    }
  }
    if (JSON.parse(window.atob(token.split('.')[1])).email!=null){
    this.email=JSON.parse(window.atob(token.split('.')[1])).email; 
    }
    if (JSON.parse(window.atob(token.split('.')[1])).emails!=null && this.email==""){
      this.email=JSON.parse(window.atob(token.split('.')[1])).emails[0]; 
      }
     }
}

ngOnInit():void{
  if (this.authService.getToken()==undefined){
    this.authguard.relogUser();
    }
  
   this.prefill();
}

  showBookTableDialog(form: FormGroup): void {
    let dialogRef: MatDialogRef<BookTableDialogComponent> = this.dialog.open(BookTableDialogComponent, {
      width: this.window.responsiveWidth(),
      data: form.value,
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        form.reset();
      }
    });
  }

  showInviteDialog(form: FormGroup): void {
    let dialogRef: MatDialogRef<InvitationDialogComponent> = this.dialog.open(InvitationDialogComponent, {
      width: this.window.responsiveWidth(),
      data: form.value,
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        form.reset();
        this.invitationModel = [];
      }
    });
  }

  validateEmail(): void {
    if (!emailValidator(last(this.invitationModel))) {
      this.invitationModel.pop();
      this.snackBarservice.openSnack('Email format not valid', 1000, 'red');
    }
  }

}
