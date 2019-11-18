import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import { ConfigService } from '../../core/config/config.service';
import { MenuService } from '../../menu/services/menu.service';
import { ClusteringService } from '../services/clustering.service';
import { ClusteringCockpitComponent } from './clustering-cockpit.component';

describe('ClusteringCockpitComponent', () => {
  let component: ClusteringCockpitComponent;
  // tslint:disable-next-line:prefer-const
  let http: HttpClient;
  let configService: ConfigService;
  let clusteringService: ClusteringService;
  let menuService: MenuService;
  // tslint:disable-next-line:prefer-const
  let store: Store<State>;

  beforeEach(() => {
    configService = new ConfigService(store);
    clusteringService = new ClusteringService(http, configService);
    menuService = new MenuService(http, configService);
    component = new ClusteringCockpitComponent(clusteringService, menuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
