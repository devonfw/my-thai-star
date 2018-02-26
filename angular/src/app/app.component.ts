import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav/shared/sidenav.service';
import { AuthService } from './core/authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';
import { config } from './config';

@Component({
  selector: 'public-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  mobileSidenavOpened: boolean = false;
  constructor(public router: Router,
              public sidenav: SidenavService,
              public translate: TranslateService,
              public auth: AuthService) {
    translate.addLangs(config.langs.map( (value: any) => value.value ));
    translate.setDefaultLang('en');
    if (find(translate.getLangs(), (lang: string) => lang === translate.getBrowserLang())) {
      translate.use(translate.getBrowserLang());
    }
  }

  openCloseSideNav(sidenavOpened: boolean): void {
    sidenavOpened ? this.sidenav.closeSideNav() : this.sidenav.openSideNav();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.mobileSidenavOpened = false;
  }
}
