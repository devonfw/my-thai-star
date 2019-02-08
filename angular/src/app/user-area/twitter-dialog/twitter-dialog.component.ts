import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { /* MatDialogRef, */ MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

/* @export
 * @class TwitterDialogComponent
 */
@Component({
  selector: 'public-twitter-dialog',
  templateUrl: './twitter-dialog.component.html',
  styleUrls: ['./twitter-dialog.component.scss'],
})
export class TwitterDialogComponent {
  /* Creates an instance of TwitterDialogComponent.
   * @param {MatIconRegistry} iconReg
   * @param {DomSanitizer} sanitizer
   * @memberof TwitterDialogComponent
   */
  constructor(
    // private dialog: MatDialogRef<TwitterDialogComponent>,
    public iconReg: MatIconRegistry,
    public sanitizer: DomSanitizer,
  ) {
    iconReg.addSvgIcon(
      'twitter',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/Twitter_Logo.svg',
      ),
    );
  }

  /* @param {FormGroup} form
   * @memberof TwitterDialogComponent
   */
  twitterSubmit(form: FormGroup): void {
    // TODO
  }
}
