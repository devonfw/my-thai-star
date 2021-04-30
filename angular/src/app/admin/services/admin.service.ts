import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'app/core/config/config.service';
import { FilterAdmin, Pageable, Sort } from 'app/shared/backend-models/interfaces';
import { UsersResponse } from 'app/shared/view-models/interfaces';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly filterUsersRestPath: string =
    'usermanagement/v1/user/search';

    private readonly restServiceRoot$: Observable<
    string
  > = this.config.getRestServiceRoot();

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  getOrders(
    pageable: Pageable,
    sorting: Sort[],
    filters: FilterAdmin
  ): Observable<UsersResponse[]> {
    let path: string;
    filters.pageable = pageable;
    filters.pageable.sort = sorting;
    path = this.filterUsersRestPath;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<UsersResponse[]>(`${restServiceRoot}${path}`, filters),
      ),
    );
  }
}