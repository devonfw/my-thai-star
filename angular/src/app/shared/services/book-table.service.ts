import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookTableService {

  constructor(
    private http: Http
  ) { }
  
  // RECEIVES THE BOOKING DATA (YET TO SPECIFY ON CLIENT-SIDE)
  sendBooking (data: any) : Observable<any> {
    return this.http.get('/api/message')
                    .map(res => res.json());
  }

}
