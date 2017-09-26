import { environment } from './../../../environments/environment';
import { Filter } from '../backendModels/interfaces';
import { Injectable, Injector } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IDishesDataService } from './dishes-data-service-interface';
import { config } from '../../config';
import { DishView } from '../../shared/viewModels/interfaces';
import { HttpClientService } from '../../core/httpClient/httpClient.service';

@Injectable()
export class DishesRestService implements IDishesDataService {

 private readonly filtersRestPath: string = 'dishmanagement/v1/dish/search';

 private http: HttpClientService;

 constructor(private injector: Injector) {
   this.http = this.injector.get(HttpClientService);
 }

 filter(filters: Filter): Observable<DishView[]> {
    return this.http.post(`${environment.restServiceRoot}${this.filtersRestPath}`, filters)
                    .map((res: Response) => res.json().result);
 }

}
