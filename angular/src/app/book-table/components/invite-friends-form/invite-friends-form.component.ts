import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCheckbox, MatDialog} from '@angular/material';
import {InvitationDialogComponent} from '../../container/invitation-dialog/invitation-dialog.component';
import {WindowService} from '../../../core/window/window.service';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {emailValidator} from '../../../shared/directives/email-validator.directive';
import {BookingInfo} from '../../../shared/backend-models/interfaces';
import * as moment from 'moment';
import { last } from 'lodash';

@Component({
  selector: 'invite-friends-form',
  templateUrl: './invite-friends-form.component.html',
  styleUrls: ['./invite-friends-form.component.css']
})
export class InviteFriendsFormComponent implements OnInit {
  @Output() submitt = new EventEmitter<BookingInfo>();

  invitationModel: string[] = [];
  minDate: Date = new Date();
  REGEXP_EMAIL: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


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
    private window: WindowService,
    private translate: TranslateService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getFirstDayWeek();
  }

  get name(): AbstractControl {
    return this.invitationForm.get('name');
  }
  get email(): AbstractControl {
    return this.invitationForm.get('email');
  }
  get invName(): AbstractControl {
    return this.invitationForm.get('name');
  }
  get invEmail(): AbstractControl {
    return this.invitationForm.get('email');
  }

  showInviteDialog(checkbox: MatCheckbox): void {
    this.dialog
      .open(InvitationDialogComponent, {
        width: this.window.responsiveWidth(),
        data: this.invitationForm.value,
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.invitationForm.reset();
          this.invitationModel = [];
          checkbox.checked = false;
        }
      });
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

  submit() {
    if (this.invitationForm.valid) {
      this.submitt.emit(this.invitationForm.value);
    }
  }
}
