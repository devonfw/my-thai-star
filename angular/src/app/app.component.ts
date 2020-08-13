import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidenavService } from './sidenav/services/sidenav.service';
import { AuthService } from './core/authentication/auth.service';
import { ElectronService } from 'ngx-electron';
import { find } from 'lodash';
import * as moment from 'moment';
import * as fromRoot from './store';
import * as fromAuth from './user-area/store';
import * as fromConfig from './core/config/store';
import { fadeAnimation } from './core/animations/fade.animation';
import { PredictionCockpitComponent } from './cockpit-area/prediction-cockpit/prediction-cockpit.component';
import { ClusteringCockpitComponent } from './cockpit-area/clustering-cockpit/clustering-cockpit.component';
import { ConfigService } from './core/config/config.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-public-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation], // register the animation
})
export class AppComponent implements OnInit {
  logged$: Observable<boolean>;
  role$: Observable<string>;
  userName$: Observable<string>;
  mobileSidenavOpened = false;
  year: string = moment().format('YYYY');
  version$: Observable<string>;

  constructor(
    public router: Router,
    public sidenav: SidenavService,
    public transloco: TranslocoService,
    public auth: AuthService,
    public electronService: ElectronService,
    public configService: ConfigService,
    private store: Store<fromRoot.State>,
  ) {
    /* TODO: if electronService
    if (electronService.isElectronApp) {
      // Elecron stuff
    } else {
      // Web stuff
    }
    */
  }

  ngOnInit(): void {
    this.role$ = this.store.pipe(select(fromAuth.getRole));
    this.userName$ = this.store.pipe(select(fromAuth.getUserName));
    this.logged$ = this.store.pipe(select(fromAuth.getLogged));
    this.version$ = this.store.pipe(select(fromConfig.getConfigVersion));

    this.transloco.setAvailableLangs(
      this.configService.getValues().langs.map((value: any) => value.value),
    );
    this.transloco.setDefaultLang('en');
    if (
      find(
        this.transloco.getAvailableLangs(),
        (lang: string) => lang === this.getBrowserLanguage(),
      )
    ) {
      this.transloco.setActiveLang(this.getBrowserLanguage());
    }
    moment.locale(this.transloco.getActiveLang());

    if (
      this.configService.getValues().enablePrediction ||
      this.configService.getValues().enableClustering
    ) {
      const currentRoutes = this.router.config;
      const newRoutes = currentRoutes.reduce((accum, current) => {
        if (
          current.path === 'prediction' &&
          this.configService.getValues().enablePrediction
        ) {
          // change prediction route component from NotSupportedComponent to PredictionCockpitComponent
          accum.push({
            path: current.path,
            component: PredictionCockpitComponent,
            canActivate: current.canActivate,
          });
        } else if (
          current.path === 'clustering' &&
          this.configService.getValues().enableClustering
        ) {
          // change clustering route component from NotSupportedComponent to ClusteringCockpitComponent
          accum.push({
            path: current.path,
            component: ClusteringCockpitComponent,
            canActivate: current.canActivate,
          });
        } else {
          accum.push(current);
        }
        return accum;
      }, []);
      this.router.resetConfig(newRoutes);
    }
  }

  private getBrowserLanguage(): string {
    return navigator.language.split('-')[0];
  }

  sidenavStatus(opened: boolean): boolean {
    this.sidenav.opened = opened;
    return opened;
  }

  navigateTo(route: string): void {
    this.store.dispatch(fromRoot.go({ path: [route] }));
    this.mobileSidenavOpened = false;
  }

  getRouterOutletState(outlet: RouterOutlet): any {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
