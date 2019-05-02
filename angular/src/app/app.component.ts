import { Component } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { SidenavService } from './sidenav/shared/sidenav.service';
import { AuthService } from './core/authentication/auth.service';
import { ElectronService } from 'ngx-electron';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';
import { fadeAnimation } from './animations/fade.animation';
import * as moment from 'moment';
import { ConfigService } from './core/config/config.service';
import { PredictionCockpitComponent } from './cockpit-area/prediction-cockpit/prediction-cockpit.component';
import { AuthGuardService } from './core/authentication/auth-guard.service';

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
  
    if (configService.getValues().enablePrediction) {
	  // change prediction route component from NotSupportedComponent to PredictionCockpitComponent
      var currentRoutes = router.config;
      var newRoutes = [];
      for (var i = 0 ; i < currentRoutes.length ; i++) {
        if (currentRoutes[i].path == "prediction") {
          newRoutes.push(
            {
              path: currentRoutes[i].path,
              component: PredictionCockpitComponent,
              canActivate: currentRoutes[i].canActivate,
            }
          );
        }
        else {
          newRoutes.push(currentRoutes[i]);
        }
      }
      router.resetConfig(newRoutes);
    }

    if (electronService.isElectronApp) {
      // Elecron stuff
    } else {
      // Web stuff
    }
  }

  sidenavStatus(opened: boolean): boolean {
    this.sidenav.opened = opened;
    return opened;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.mobileSidenavOpened = false;
  }

  getRouterOutletState(outlet: RouterOutlet): any {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
