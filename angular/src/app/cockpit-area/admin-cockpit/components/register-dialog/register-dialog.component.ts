import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { FormGroup } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { RoleInfo } from 'app/shared/backend-models/interfaces'
@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  roleSelector: RoleInfo[] = [
    {id: 0, name: 'admin.costumer'},
    {id: 1, name: 'admin.waiter'},
    {id: 2, name: 'admin.manager'}
  ];

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logInSubmit(formValue: {confirmPassword:string, email:string, password:string}): void {
    
    this.dialog.closeAll();
  }

  signInSubmit(formValue: {confirmPassword:string, email:string, password:string}): void {
    console.log(formValue);
    this.dialog.closeAll();
  }

  ngOnInit(): void {

  }


  closeLoginDialog(event: Event): void {
    this.dialog.closeAll();
    event.preventDefault();
  }

  
}
