import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ExtraView, OrderView, SaveOrderResponse} from '../../shared/view-models/interfaces';
import {OrderInfo, OrderListInfo} from 'app/shared/backend-models/interfaces';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../core/config/config.service';

@Injectable()
export class SidenavService {
  private readonly restServiceRoot: string;
  private readonly saveOrdersPath: string = 'ordermanagement/v1/order';
  private orders: OrderView[] = [];

  opened = false;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
  }

  public openSideNav(): void {
    this.opened = true;
  }

  public closeSideNav(): void {
    this.opened = false;
  }

  public getNumberOrders(): number {
    return this.orders.length;
  }

  public sendOrders(token: string): Observable<SaveOrderResponse> {
    const orderList: OrderListInfo = {
      booking: { bookingToken: token },
      orderLines: this.composeOrders(this.orders),
    };

    this.closeSideNav();
    return this.http.post<SaveOrderResponse>(
      `${this.restServiceRoot}${this.saveOrdersPath}`,
      orderList,
    );
  }

  composeOrders(orders: OrderView[]): OrderInfo[] {
    const composedOrders: OrderInfo[] = [];
    orders.forEach((order: OrderView) => {
      const extras: any[] = [];
      order.extras
        .filter((extra: ExtraView) => extra.selected)
        .forEach((extra: ExtraView) => extras.push({ id: extra.id }));
      composedOrders.push({
        orderLine: {
          dishId: order.dish.id,
          amount: order.orderLine.amount,
          comment: order.orderLine.comment,
        },
        extras: extras,
      });
    });
    return composedOrders;
  }
}
