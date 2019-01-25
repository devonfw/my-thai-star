import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../core/authentication/auth.service';
import { SidenavService } from '../sidenav/shared/sidenav.service';
import { UserAreaService } from '../user-area/shared/user-area.service';
import { WindowService } from '../core/window/window.service';

import { LoginDialogComponent } from '../user-area/login-dialog/login-dialog.component';
import { PasswordDialogComponent } from '../user-area/password-dialog/password-dialog.component';
import { TwitterDialogComponent } from '../user-area/twitter-dialog/twitter-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { ConfigService } from '../core/config/config.service';

@Component({
  selector: 'public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  selectableLangs: any[];
  flag: string;

  @Output() openCloseSidenavMobile = new EventEmitter<any>();

  constructor(
    public window: WindowService,
    public translate: TranslateService,
    public router: Router,
    public sidenav: SidenavService,
    public dialog: MatDialog,
    public auth: AuthService,
    public userService: UserAreaService,
    public dateTimeAdapter: DateTimeAdapter<any>,
    private configService: ConfigService
  ) {
    this.selectableLangs = this.configService.getValues().langs;
    this.getFlag(this.translate.currentLang);
    this.dateTimeAdapter.setLocale(this.translate.currentLang);
  }

  openCloseSideNav(sidenavOpened: boolean): void {
    sidenavOpened ? this.sidenav.closeSideNav() : this.sidenav.openSideNav();
  }

  openCloseNavigationSideNav(): void {
    this.openCloseSidenavMobile.emit();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.openCloseSidenavMobile.emit();
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.dateTimeAdapter.setLocale(lang);
    this.getFlag(lang);
  }

  getFlag(lang: string): void {
    switch (lang) {
      case 'ca':
        this.flag = 'es';
        break;
      case 'en':
        this.flag = 'gb';
        break;
      case 'hi':
        this.flag = 'in';
        break;

      default:
        this.flag = lang;
        break;
    }
  }

  openLoginDialog(): void {
    const dialogRef: MatDialogRef<LoginDialogComponent> = this.dialog.open(
      LoginDialogComponent,
      {
        width: this.window.responsiveWidth(),
      },
    );
    dialogRef.afterClosed().subscribe((content: any) => {
      if (content) {
        if (content.email) {
          this.userService.register(content.email, content.password);
        } else {
          this.userService.login(content.username, content.password);
        }
      }
    });
  }

  openResetDialog(): void {
    const dialogRef: MatDialogRef<PasswordDialogComponent> = this.dialog.open(
      PasswordDialogComponent,
      {
        width: this.window.responsiveWidth(),
      },
    );
    dialogRef.afterClosed().subscribe((content: any) => {
      // TODO: manage user input
    });
  }

  openTwitterDialog(): void {
    const dialogRef: MatDialogRef<TwitterDialogComponent> = this.dialog.open(
      TwitterDialogComponent,
      {
        width: this.window.responsiveWidth(),
      },
    );
    dialogRef.afterClosed().subscribe((content: any) => {
      // TODO: manage user input
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['restaurant']);
  }
}
