import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../core/authentication/auth.service';
import { SidenavService } from '../sidenav/shared/sidenav.service';
import { UserAreaService } from '../user-area/shared/user-area.service';
import { WindowService } from '../core/window/window.service';

import { LoginDialogComponent } from '../user-area/container/login-dialog/login-dialog.component';
import { PasswordDialogComponent } from '../user-area/container/password-dialog/password-dialog.component';
import { TwitterDialogComponent } from '../user-area/container/twitter-dialog/twitter-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { ConfigService } from '../core/config/config.service';
import { Observable } from 'rxjs';
import { Logout } from '../user-area/store/actions/auth.actions';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/reducers';
import * as fromAuth from 'app/user-area/store/reducers/auth.reducer';

@Component({
  selector: 'public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authState$: Observable<fromAuth.State>;
  selectableLangs: any[];
  flag: string;
  role: string | null;

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
    private configService: ConfigService,
    private store: Store<fromApp.AppState>
  ) {
    this.selectableLangs = this.configService.getValues().langs;
    this.getFlag(this.translate.currentLang);
    this.dateTimeAdapter.setLocale(this.translate.currentLang);
    this.authState$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.authState$.subscribe(x => console.log(x.userData.currentRole));
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
    this.store.dispatch(new Logout());
  }
}
