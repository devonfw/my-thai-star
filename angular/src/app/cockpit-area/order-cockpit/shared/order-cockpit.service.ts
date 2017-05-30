import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationView, OrderListView, OrderView } from '../../../shared/viewModels/interfaces';
import { FilterCockpit, Pagination } from '../../../shared/backend/backendModels/interfaces';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';
import { PriceCalculatorService } from '../../../sidenav/shared/price-calculator.service';
import {map, cloneDeep} from 'lodash';

@Injectable()
export class OrderCockpitService {

  constructor(private bookingDataService: BookingDataService,
              private priceCalculator: PriceCalculatorService) { }

  getBookingOrders(pagination: Pagination, filters?: FilterCockpit): Observable<OrderListView[]> {
    if (!filters) {
      filters = {
          bookingDate: undefined,
          email: undefined,
          bookingToken: undefined,
      };
    }
    filters.pagination = pagination;
    return this.bookingDataService.getBookingOrders(filters)
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
