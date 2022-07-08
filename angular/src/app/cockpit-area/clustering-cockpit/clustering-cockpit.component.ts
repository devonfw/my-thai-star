import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import {
  ClusteringCriteria,
  Pageable,
} from '../../shared/backend-models/interfaces';
import { ClusteringService } from '../services/clustering.service';
import { ClustersData, DishView } from '../../shared/view-models/interfaces';
import { MenuService } from '../../menu/services/menu.service';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { SortDirection } from 'app/menu/components/menu-filters/filter-sort/filter-sort.component';
import * as L from 'leaflet';
import { FilterFormData } from 'app/menu/components/menu-filters/menu-filters.component';

@Component({
  selector: 'app-map-component',
  templateUrl: './clustering-cockpit.component.html',
  styleUrls: ['./clustering-cockpit.component.scss'],
})
export class ClusteringCockpitComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer;

  // Open Street Map
  map: L.Map = null;
  jsonLayer = null;

  mapLatitude = 49.40178;
  mapLongitude = 8.684582;
  defaultZoom = 13;
  clustersfeatureLayer;

  menu;

  row: any;

  // Clusters Statistics table
  displayedColumns = ['color', 'amount'];
  clustersResultsBusy = false;
  clustersResultsDataSource;

  currentDate = new Date();
  clusteringFilter: ClusteringCriteria = {
    startBookingdate: new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 12,
      1,
    ).toISOString(),
    endBookingdate: new Date().toISOString(),
    dishId: 0,
    clusters: 8,
  };

  constructor(
    private clusteringService: ClusteringService,
    private menuService: MenuService,
  ) {}

  ngOnInit(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [this.mapLatitude, this.mapLongitude],
      this.defaultZoom,
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.getMenu({
      sort: {
        property: null,
        direction: SortDirection.DESC,
      },
      categories: {
        mainDishes: false,
        starters: false,
        desserts: false,
        noodle: false,
        rice: false,
        curry: false,
        vegan: false,
        vegetarian: false,
        favourites: false,
      },
      maxPrice: null,
      minLikes: null,
      searchBy: null,
    });
    this.drawClusters();
  }

  ngAfterViewInit(): void {
    // the map doesn't load completelty in the begining,
    // until the browser window is resized..
    // so the map's tiles have to be reloaded with the following method
    this.map.invalidateSize();
  }

  getMenu(filters: FilterFormData): void {
    const pageable: Pageable = {
      pageSize: 8,
      pageNumber: 0,
      sort: [
        {
          property: filters.sort.property,
          direction: filters.sort.direction,
        },
      ],
    };
    this.menuService
      .getDishes(this.menuService.composeFilters(pageable, filters))
      .pipe(
        map((res: { pageable: Pageable; content: DishView[] }) => {
          return res.content.map((item) => item.dish);
        }),
      )
      .subscribe((menu) => {
        this.menu = menu;
      });
  }

  restClusters(): void {
    this.clustersfeatureLayer = null;
    this.clustersResultsDataSource = null;
    this.map.removeLayer(this.jsonLayer);
  }

  updateMap(): void {
    this.restClusters();
    this.drawClusters();
  }

  getClusterColor(sizes: number[]): string[] {
    const max = Math.max(...sizes);
    const min = Math.min(...sizes);

    const steps = 10;
    // Blue hue over purple hue to red hue
    const hs = Array(steps)
      .fill(0)
      .map((_, i) => 2 / 3 + ((i / (steps - 1)) * 1) / 3);
    const s = 1;
    const v = 0.8;
    const p = v * (1 - s);

    const gradientStops = hs.map((h) => {
      let r: number;
      let g: number;
      let b: number;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          (r = v), (g = t), (b = p);
          break;
        case 1:
          (r = q), (g = v), (b = p);
          break;
        case 2:
          (r = p), (g = v), (b = t);
          break;
        case 3:
          (r = p), (g = q), (b = v);
          break;
        case 4:
          (r = t), (g = p), (b = v);
          break;
        case 5:
          (r = v), (g = p), (b = q);
          break;
      }

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    });

    return sizes.map((size) => {
      const percentage = Math.min((size - min) / (max - min), 1);
      const gradientPercentages = gradientStops.map(
        (_, i) => i / (gradientStops.length - 1),
      );
      const gradientIndex1 = gradientPercentages.findIndex(
        (gp, i, a) =>
          gp <= percentage && (a[i + 1] == null || a[i + 1] > percentage),
      );
      const gradientIndex2 = gradientPercentages.findIndex(
        (gp, i, a) => gp > percentage || a[i + 1] == null,
      );
      const gradientPercentage =
        gradientIndex2 !== gradientIndex1
          ? (percentage - gradientPercentages[gradientIndex1]) /
            (gradientPercentages[gradientIndex2] -
              gradientPercentages[gradientIndex1])
          : 0;

      const color1 = gradientStops[gradientIndex1];
      const color2 = gradientStops[gradientIndex2];
      const color = color1.map((x, i) =>
        Math.round(
          x * (1 - gradientPercentage) + color2[i] * gradientPercentage,
        ),
      );

      return `rgb(${color.join(',')})`;
    });
  }

  showProgressBar(show: boolean): void {
    this.clustersResultsBusy = show;
  }

  drawClusters(): void {
    this.showProgressBar(true);
    this.clusteringService
      .getClusters(this.clusteringFilter)
      .subscribe((clustersData: ClustersData) => {
        this.clustersfeatureLayer = {
          type: 'FeatureCollection',
          features: [],
        };
        if (clustersData.data.length > 0) {
          const colors = this.getClusterColor(
            clustersData.data.map((cluster) => cluster.amount),
          );

          clustersData.data.forEach((cluster, i) => {
            if (cluster.id !== 0) {
              // cluster with id=0 represents noise, don't visualize it
              const color = colors[i];
              if (cluster.polygon !== null) {
                const feature = {
                  type: 'Feature',
                  properties: {
                    id: cluster.id,
                    dishId: cluster.dishId,
                    dishName: cluster.dishName,
                    amount: cluster.amount,
                    averageX: parseFloat(cluster.x),
                    averageY: parseFloat(cluster.y),
                    color,
                  },
                  geometry: JSON.parse(cluster.polygon.toString()),
                };

                this.clustersfeatureLayer.features.push(feature);
              }
            }
          });
          // Add feature layer to the map , and define the style of the features
          this.jsonLayer = L.geoJSON(this.clustersfeatureLayer, {
            style: this.getFeatureStyle,
            onEachFeature: this.onFeatureClicked,
          });
          this.jsonLayer.addTo(this.map);
          // ------------------------------------------------------------------
          this.clustersResultsDataSource = new MatTableDataSource(
            this.clustersfeatureLayer.features,
          );
        }
        this.showProgressBar(false);
      });
  }

  // noinspection JSMethodCanBeStatic
  getFeatureStyle(
    feature,
  ): {
    clickable: boolean;
    fillColor: any;
    weight: number;
    color: any;
    fillOpacity: number;
  } {
    return {
      clickable: true,
      fillColor: feature.properties.color,
      weight: 1.3,
      color: feature.properties.color,
      fillOpacity: 0.3,
    };
  }

  onFeatureClicked(feature, layer): void {
    if (feature.properties) {
      let lon = 'E';
      let lat = 'N';
      if (feature.properties.averageX < 0) {
        lon = 'W';
      }
      if (feature.properties.averageY < 0) {
        lat = 'S';
      }
      layer.bindPopup(`<strong>Dish:</strong>  ${feature.properties.dishName}<br/><br/>
        <strong>Size:</strong> ${feature.properties.amount}<br/><br/>
        <strong>Location:</strong> ${feature.properties.averageX}&deg; ${lon}, ${feature.properties.averageY}&deg; ${lat}<br/>
      `);
    }
  }

  getSelectedRow(row: any): void {
    this.row = row;
  }
}
