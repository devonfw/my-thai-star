import {Component, OnInit} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidenavService } from './sidenav/services/sidenav.service';
import { AuthService } from './core/authentication/auth.service';
import { ElectronService } from 'ngx-electron';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';
import * as moment from 'moment';
import * as fromApp from 'app/store/reducers/';
import * as fromAuth from 'app/user-area/store/selectors/';
import { fadeAnimation } from './core/animations/fade.animation';
import { PredictionCockpitComponent } from './cockpit-area/prediction-cockpit/prediction-cockpit.component';
import { ClusteringCockpitComponent } from './cockpit-area/clustering-cockpit/clustering-cockpit.component';
import { ConfigService } from './core/config/config.service';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'public-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation], // register the animation
})
export class AppComponent implements OnInit{
  logged$: Observable<boolean>;
  role$: Observable<string>;
  userName$: Observable<string>;
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
    private store: Store<fromApp.State>
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

    if (configService.getValues().enablePrediction || configService.getValues().enableClustering) {
      const currentRoutes = router.config;
      const newRoutes = currentRoutes.reduce((accum, current) => {
        if (current.path === 'prediction' && configService.getValues().enablePrediction) {
          // change prediction route component from NotSupportedComponent to PredictionCockpitComponent
          accum.push(
            {
              path: current.path,
              component: PredictionCockpitComponent,
              canActivate: current.canActivate,
            }
          );
        } else if (current.path === 'clustering' && configService.getValues().enableClustering) {
          // change clustering route component from NotSupportedComponent to ClusteringCockpitComponent
          accum.push(
            {
              path: current.path,
              component: ClusteringCockpitComponent,
              canActivate: current.canActivate,
            }
          );
        } else {
          accum.push(current);
        }
        return accum;
      }, []);
      router.resetConfig(newRoutes);
    }

    if (electronService.isElectronApp) {
      // Elecron stuff
    } else {
      // Web stuff
    }
  }

  ngOnInit(): void {
    this.role$ = this.store.pipe(select(fromAuth.getRole));
    this.userName$ = this.store.pipe(select(fromAuth.getUserName));
    this.logged$ = this.store.pipe(select(fromAuth.getLogged));
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
