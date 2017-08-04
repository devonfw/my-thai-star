import { Router } from '@angular/router';
import { SnackBarService } from '../snackService/snackService.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication/auth.service';
import { WindowService } from '../windowService/windowService.service';

@Injectable()
export class HttpClientService {

    headers: Headers;

    constructor(private auth: AuthService,
                private snackService: SnackBarService,
                private router: Router,
                private http: Http,
                private window: WindowService) {
      this.headers = new Headers();
      this.headers.append('Content-Type',  'application/json');
    }

    setHeaderToken(value: string): void {
        this.headers.delete('Authorization');
        if (value) {
          this.headers.append('Authorization', value);
        }
    }

    get(url: string): Observable<any> {
        return new Observable((observer: any) => {
            this.setHeaderToken(this.auth.getToken());
            this.http.get(url, {withCredentials: true, headers: this.headers})
                .subscribe( (data: any) => {
                    return observer.next(data);
                }, (error: any) => {
                    if (error.status === 400 || error.status === 500) {
                        this.auth.setLogged(false);
                        this.auth.setRole('CUSTOMER');
                        this.auth.setUser('');
                        this.auth.setToken('');
                        this.snackService.openSnack(error.json().message, 4000, 'red');
                        this.router.navigate(['restaurant']);
                    }
                    return observer.error(error);
            });
        });
    }

    post(url: string, data: any): Observable<any> {
        return new Observable((observer: any) => {
            this.setHeaderToken(this.auth.getToken());
            this.http.post(url, data, {withCredentials: true, headers: this.headers})
                .subscribe( (result: any) => {
                    return observer.next(result);
                }, (error: any) => {
                    if (error.status === 400 || error.status === 500) {
                        this.auth.setLogged(false);
                        this.auth.setRole('CUSTOMER');
                        this.auth.setUser('');
                        this.auth.setToken('');
                        this.snackService.openSnack(error.json().message, 4000, 'red');
                        this.router.navigate(['restaurant']);
                    }
                    return observer.error(error);
                });
        });
    }
}
