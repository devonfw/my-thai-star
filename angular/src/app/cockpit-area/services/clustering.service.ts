import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';
import { ClusteringCriteria } from '../../shared/backend-models/interfaces';
import { ClustersData } from '../../shared/view-models/interfaces';

@Injectable()
export class ClusteringService {
  private readonly clusteringRestPath: string =
    'clustermanagement/v1/geoclusters';

  private readonly restServiceRoot$: Observable<
    string
  > = this.config.getRestServiceRoot();

  constructor(private http: HttpClient, private config: ConfigService) {}

  getClusters(
    clusteringCriteria: ClusteringCriteria,
  ): Observable<ClustersData> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http
          .post(
            `${restServiceRoot}${this.clusteringRestPath}`,
            clusteringCriteria,
          )
          .pipe(
            map((res: any) => {
              return res.clustersData;
            }),
          ),
      ),
    );
    // map the results later
  }
}
