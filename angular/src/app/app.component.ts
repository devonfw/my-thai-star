import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidenavService } from './sidenav/shared/sidenav.service';
import { AuthService } from './core/authentication/auth.service';
import { ElectronService } from './shared/electron/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';
import { fadeAnimation } from './animations/fade.animation';
import * as moment from 'moment';
import { ConfigService } from './core/config/config.service';

/* @export
 * @class AppComponent
 */
@Component({
  selector: 'public-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation], // register the animation
})
export class AppComponent {
  mobileSidenavOpened = false;
  year: string = moment().format('YYYY');
  version: string;

  /* Creates an instance of AppComponent.
   * @param {Router} router
   * @param {SidenavService} sidenav
   * @param {TranslateService} translate
   * @param {AuthService} auth
   * @param {ElectronService} electronService
   * @param {ConfigService} configService
   * @memberof AppComponent
   */
  constructor(
    public router: Router,
    public sidenav: SidenavService,
    public translate: TranslateService,
    public auth: AuthService,
    public electronService: ElectronService,
    public configService: ConfigService,
  ) {
    this.version = configService.getValues().version;
    translate.addLangs(
      configService.getValues().langs.map((value: any) => value.value),
    );
    translate.setDefaultLang('en');
    if (
      find(
        translate.getLangs(),
        (lang: string) => lang === translate.getBrowserLang(),
      )
    ) {
      translate.use(translate.getBrowserLang());
    }
    moment.locale(this.translate.currentLang);

    if (electronService.isElectron()) {
      // Elecron stuff
    } else {
      // Web stuff
    }
  }

  /* @param {boolean} opened
   * @returns {boolean}
   * @memberof AppComponent
   */
  sidenavStatus(opened: boolean): boolean {
    this.sidenav.opened = opened;
    return opened;
  }

  /* @param {string} route
   * @memberof AppComponent
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.mobileSidenavOpened = false;
  }

  /* @param {RouterOutlet} outlet
   * @returns {*}
   * @memberof AppComponent
   */
  getRouterOutletState(outlet: RouterOutlet): any {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
