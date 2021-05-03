import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { FormGroup } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

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
    this.dialog.closeAll();
  }

  ngOnInit(): void {

  }


  closeLoginDialog(event: Event): void {
    this.dialog.closeAll();
    event.preventDefault();
  }

  
}
