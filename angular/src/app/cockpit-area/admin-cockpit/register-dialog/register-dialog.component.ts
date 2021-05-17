import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { RoleInfo, UserInfo } from 'app/shared/backend-models/interfaces'
import { AdminService } from 'app/cockpit-area/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserView } from 'app/shared/view-models/interfaces';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  private translocoSubscription = Subscription.EMPTY;
  form: FormGroup;

  roleSelector: RoleInfo[] = [
    {id: 0, name: 'userRoles.customer'},
    {id: 1, name: 'userRoles.waiter'},
    {id: 2, name: 'userRoles.manager'}
  ];
  roleId: number = 0;
  toSend = {};

  constructor(
    private translocoService: TranslocoService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    protected _snackBar: MatSnackBar
  ) {}

  //string parts for SuccessBar
  stringpart1:string;
  stringpart2:string;
  stringpart3:string;

  ngOnInit(): void {

    this.translocoService.langChanges$.subscribe((event: any) => {
      this.translateSuccessBar(event);
      moment.locale(this.translocoService.getActiveLang());
    });

    this.form =  this.formBuilder.group({
      username: [[''],[Validators.required]],
      email: [[''],[Validators.required,,Validators.email]],
      userRoleId: [0],
      password: [[''],[Validators.required, Validators.minLength(6)]],
      confirmPassword: [[''],[Validators.minLength(6)]],
    },{ 
      validator: MustMatch('password', 'confirmPassword') 
    });
  }

  submit() {
    if(this.form.valid) {
      var formData = {...this.form.value};
      delete formData["confirmPassword"];
      this.adminService.addUser(formData).subscribe(message => {
        this.openSuccessBar(message);
        this.dialogRef.close(message); 
      });
    }
  }

  translateSuccessBar(lang: string): void {
    this.translocoSubscription = this.translocoService
      .selectTranslateObject('cockpit.admin.successBarCreated', {}, lang)
      .subscribe((cockpitcockpitsuccessBar) => {
        this.stringpart1 = cockpitcockpitsuccessBar.stringpart1;
        this.stringpart2 = cockpitcockpitsuccessBar.stringpart2;
        this.stringpart3 = cockpitcockpitsuccessBar.stringpart3;
      });
  }

  openSuccessBar(message: UserView) {
    this._snackBar.open(`${this.stringpart1}${message.username}${this.stringpart2}${message.id}${this.stringpart3}` , 'Ok!');
  }

}
