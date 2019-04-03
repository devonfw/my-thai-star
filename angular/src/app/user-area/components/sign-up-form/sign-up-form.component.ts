import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserData} from '../../models/user';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<UserData>();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      console.log('Test: ', this.form.value);
      this.submitted.emit(this.form.value);
    }
  }
}
