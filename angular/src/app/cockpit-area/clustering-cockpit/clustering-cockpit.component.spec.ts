import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import { ConfigService } from '../../core/config/config.service';
import { MenuService } from '../../menu/services/menu.service';
import { ClusteringService } from '../services/clustering.service';
import { ClusteringCockpitComponent } from './clustering-cockpit.component';
import { config } from '../../core/config/config';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('ClusteringCockpitComponent', () => {
  let component: ClusteringCockpitComponent;
  // tslint:disable-next-line:prefer-const
  let http: HttpClient;
  let configService: ConfigService;
  let clusteringService: ClusteringService;
  let menuService: MenuService;
  // tslint:disable-next-line:prefer-const
  let store: Store<State>;
  let initialState;

  beforeEach(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(Store);
    configService = new ConfigService(store);
    clusteringService = new ClusteringService(http, configService);
    menuService = new MenuService(http, configService);
    component = new ClusteringCockpitComponent(clusteringService, menuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
