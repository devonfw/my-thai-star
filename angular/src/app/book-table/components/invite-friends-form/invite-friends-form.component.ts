import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Booking} from '../../models/booking';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import {emailValidator} from '../../../shared/directives/email-validator.directive';
import * as moment from 'moment';
import {last} from 'lodash';

@Component({
  selector: 'invite-friends-form',
  templateUrl: './invite-friends-form.component.html',
  styleUrls: ['./invite-friends-form.component.css']
})
export class InviteFriendsFormComponent {
  invitationModel: string[] = [];
  minDate: Date = new Date();

  REGEXP_EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  invitationForm = new FormGroup({
    bookingDate: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.REGEXP_EMAIL),
    ]),
    invitedGuests: new FormControl(this.invitationModel),
  });

  constructor(
    private translate: TranslateService,
    private snackBarService: SnackBarService,
  ) {}

  get invName(): AbstractControl {
    return this.invitationForm.get('name');
  }
  get invEmail(): AbstractControl {
    return this.invitationForm.get('email');
  }

  validateEmail(): void {
    if (!emailValidator(last(this.invitationModel))) {
      this.invitationModel.pop();
      this.translate
        .get('bookTable.formErrors.emailFormat')
        .subscribe((text: string) => {
          this.snackBarService.openSnack(text, 1000, 'red');
        });
    }
  }

  getFirstDayWeek(): string {
    moment.locale(this.translate.currentLang);
    const firstDay: string = moment(moment().weekday(0)).format('d');
    return firstDay;
  }
}
