import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ClustersData } from '../../shared/view-models/interfaces';
import { ClusteringCriteria } from '../../shared/backend-models/interfaces';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class ClusteringService {

  private readonly clusteringRestPath: string = 'clustermanagement/v1/geoclusters';

  private readonly restServiceRoot: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
    ) {
        this.restServiceRoot = this.configService.getValues().restServiceRoot;
    }

  getClusters(clusteringCriteria: ClusteringCriteria): Observable<ClustersData> {

    return this.http.post(`${this.restServiceRoot}${this.clusteringRestPath}`, clusteringCriteria)
                        .pipe(map((res: any) => {
                          return res.clustersData;
                        }));
    // map the results later

  }

}
