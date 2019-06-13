import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {SidenavService} from '../sidenav/services/sidenav.service';
import {WindowService} from '../core/window/window.service';
import {PasswordDialogComponent} from '../user-area/components/password-dialog/password-dialog.component';
import {TwitterDialogComponent} from '../user-area/components/twitter-dialog/twitter-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {DateTimeAdapter} from 'ng-pick-datetime';
import {ConfigService} from '../core/config/config.service';
import * as fromApp from 'app/store/reducers/';
import * as fromAuth from 'app/user-area/store/selectors/';
import {select, Store} from '@ngrx/store';
import {Logout, OpenDialog} from '../user-area/store/actions/auth.actions';
import {Observable} from 'rxjs';


@Component({
  selector: 'public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  logged$: Observable<boolean>;
  role$: Observable<string>;
  userName$: Observable<string>;
  selectableLangs: any[];
  flag: string;

  @Output() openCloseSidenavMobile = new EventEmitter<any>();

  constructor(
    public window: WindowService,
    public translate: TranslateService,
    public router: Router,
    public sidenav: SidenavService,
    public dialog: MatDialog,
    public dateTimeAdapter: DateTimeAdapter<any>,
    private configService: ConfigService,
    private store: Store<fromApp.State>
  ) {
    this.selectableLangs = this.configService.getValues().langs;
    this.getFlag(this.translate.currentLang);
    this.dateTimeAdapter.setLocale(this.translate.currentLang);
  }

  ngOnInit(): void {
    this.role$ = this.store.pipe(select(fromAuth.getRole));
    this.userName$ = this.store.pipe(select(fromAuth.getUserName));
    this.logged$ = this.store.pipe(select(fromAuth.getLogged));
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
    this.store.dispatch(new OpenDialog());
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
