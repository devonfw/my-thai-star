import { environment } from './../../../../environments/environment';
import { Filter } from '../backendModels/interfaces';
import { Injectable, Injector } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IDishesDataService } from './dishes-data-service-interface';
import { config } from '../../../config';
import { DishView } from '../../viewModels/interfaces';
import { HttpClient } from '../../httpClient/httpClient.service';

@Injectable()
export class DishesRestService implements IDishesDataService {

 private readonly filtersRestPath: string = 'dishmanagement/v1/dish/search';

 private http: HttpClient;

 constructor(private injector: Injector) {
   this.http = this.injector.get(HttpClient);
 }

 filter(filters: Filter): Observable<DishView[]> {
    return this.http.post(`${environment.restServiceRoot}${this.filtersRestPath}`, filters)
                    .map((res: Response) => res.json().result);
 }

}
