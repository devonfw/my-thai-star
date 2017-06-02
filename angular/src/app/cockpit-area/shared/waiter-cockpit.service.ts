import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { OrderDataService } from '../../shared/backend/order/order-data-service';
import { FilterCockpit, Pagination } from '../../shared/backend/backendModels/interfaces';
import { OrderListView, OrderView } from '../../shared/viewModels/interfaces';
import { map, cloneDeep} from 'lodash';

@Injectable()
export class WaiterCockpitService {

  constructor(private orderDataService: OrderDataService,
              private priceCalculator: PriceCalculatorService) { }

  getBookings(pagination: Pagination, filters?: FilterCockpit): Observable<OrderListView[]> {
    if (!filters) {
      filters = {
          bookingDate: undefined,
          email: undefined,
          bookingToken: undefined,
      };
    }
    filters.pagination = pagination;
    return this.orderDataService.getBookingOrders(filters)
               .map((orders: OrderListView[]) => orders as OrderListView[]);
  }

  orderComposer(orderList: OrderView[]): OrderView[] {
      let orders: OrderView[] = cloneDeep(orderList);
      map(orders, (o: OrderView) => {
        o.dish.price = this.priceCalculator.getPrice(o);
        o.extras = map(o.extras, 'name').join(', ');
      });
      return orders;
  }

  getTotalPrice(orderLines: OrderView[]): number {
     return this.priceCalculator.getTotalPrice(orderLines);
  }

}
