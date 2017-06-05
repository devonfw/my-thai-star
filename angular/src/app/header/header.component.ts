import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ComponentType, MdDialog, MdDialogRef } from '@angular/material';
import { LoginDialogComponent } from '../user-area/login-dialog/login-dialog.component';
import { SidenavService } from '../sidenav/shared/sidenav.service';
import { WindowService } from '../shared/windowService/windowService.service';
import { AuthService } from '../shared/authentication/auth.service';
import { PasswordDialogComponent } from '../user-area/password-dialog/password-dialog.component';
import { TwitterDialogComponent } from '../user-area/twitter-dialog/twitter-dialog.component';

@Component({
  selector: 'public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Output('openCloseSidenavMobile') sidenavNavigationEmitter: EventEmitter<any> = new EventEmitter();

  constructor(public window: WindowService,
              public router: Router,
              public sidenav: SidenavService,
              public dialog: MdDialog,
              public auth: AuthService) {
  }

  openCloseSideNav(sidenavOpened: boolean): void {
    sidenavOpened ? this.sidenav.closeSideNav() : this.sidenav.openSideNav();
  }

  openCloseNavigationSideNav(): void {
    this.sidenavNavigationEmitter.emit();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.sidenavNavigationEmitter.emit();
  }

  openLoginDialog(): void {
    let dialogRef: MdDialogRef<LoginDialogComponent> = this.dialog.open(LoginDialogComponent, {
      width: this.window.responsiveWidth(),
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.email) {
          this.auth.register(result.email, result.password);
        } else {
          this.auth.login(result.username, result.password);
        }
      }
    });
  }

  openResetDialog(): void {
    let dialogRef: MdDialogRef<PasswordDialogComponent> = this.dialog.open(PasswordDialogComponent, {
      width: this.window.responsiveWidth(),
    });
  }

  openTwitterDialog(): void {
    let dialogRef: MdDialogRef<TwitterDialogComponent> = this.dialog.open(TwitterDialogComponent, {
      width: this.window.responsiveWidth(),
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['restaurant']);
  }
}
