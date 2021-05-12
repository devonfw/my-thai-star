import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { FormGroup } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { RoleInfo } from 'app/shared/backend-models/interfaces'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { UserService } from '../services/registerservice.service';


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  roleSelector: RoleInfo[] = [
    {id: 0, name: 'userRoles.customer'},
    {id: 1, name: 'userRoles.waiter'},
    {id: 2, name: 'userRoles.manager'}
  ];
  roleId: number = 0;
  toSend = {};

  constructor(public dialog: MatDialog,
    private registerService: UserService) {}

  openDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logInSubmit(formValue: {confirmPassword:string, email:string, password:string}): void {
    console.log(formValue);
    this.dialog.closeAll();
  }

  signInSubmit(formValue: {confirmPassword:string, email:string, password:string}): void {
    
    this.toSend['username'] = formValue["name"];
    this.toSend['email'] = formValue["email"];
    this.toSend['userRoleId'] = this.roleId;
    this.toSend['password'] = formValue["password"];
    this.registerService.addUser(this.toSend); 
  }

  ngOnInit(): void {}

  closeLoginDialog(event: Event): void {
    this.dialog.closeAll();
    event.preventDefault();
  }

  
}
