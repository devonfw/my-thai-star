import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';
import { OrderListView } from '../../shared/view-models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly getOrderRestPath: string = 'ordermanagement/v1/order/';
  private readonly restServiceRoot$: Observable<string> =
    this.config.getRestServiceRoot();

  constructor(private http: HttpClient, private config: ConfigService) {}

  getOrder(id: string): Observable<OrderListView> {
    let path: string;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.get<OrderListView>(
          `${restServiceRoot}${this.getOrderRestPath}${id}`,
        ),
      ),
    );
  }
}
