import { HttpClient/*, HttpClientModule*/ } from '@angular/common/http';
import { ClusteringCockpitComponent } from './clustering-cockpit.component';
import { ClusteringService } from '../shared/clustering.service';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { ConfigService } from '../../core/config/config.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../menu/shared/menu.service';

describe('ClusteringCockpitComponent', () => {
  let component: ClusteringCockpitComponent;
  const http: HttpClient;
  let configService: ConfigService;
  let clusteringService: ClusteringService;
  let menuService: MenuService;
  const translate: TranslateService;
  const dialog: MatDialog;

  beforeEach(() => {
    configService = new ConfigService(http);
    clusteringService = new ClusteringService(
      http,
      configService,
    );
    menuService = new MenuService(
      http,
      configService,
    );
    component = new ClusteringCockpitComponent(
      clusteringService,
      menuService,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
