import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'app/core/config/config.service';
import { UsersResponse } from 'app/shared/view-models/interfaces';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly addUserRestPath: string =
    'usermanagement/v1/user';

  private readonly restServiceRoot$: Observable<
  string
> = this.config.getRestServiceRoot();

  private readonly restServiceRoot:string = "http://localhost:8081/mythaistar/services/rest/"
 

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  addUser(formValue:any): Observable<UsersResponse[]> {
    let path: string;
    path = this.addUserRestPath;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<UsersResponse[]>(`${restServiceRoot}${path}`, formValue),
      ),
    );
  }

  deleteUser(id: number) {
    let path: string = this.restServiceRoot + this.addUserRestPath + "/" + id;
    console.log(path);
    this.http.get(path);
  }

}
