import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { OrderDataService } from '../../shared/backend/order/order-data-service';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { FilterCockpit, Pagination, Sorting } from '../../shared/backend/backendModels/interfaces';
import { OrderListView, OrderView, ReservationView } from '../../shared/viewModels/interfaces';
import { map, cloneDeep} from 'lodash';

@Injectable()
export class WaiterCockpitService {

  constructor(private orderDataService: OrderDataService,
              private bookingDataService: BookingDataService,
              private priceCalculator: PriceCalculatorService) { }

  getOrders(pagination: Pagination, sorting: Sorting[], filters: FilterCockpit): Observable<OrderListView[]> {
    filters.pagination = pagination;
    filters.sort = sorting;
    return this.orderDataService.getBookingOrders(filters);
  }

  getReservations(pagination: Pagination, sorting: Sorting[], filters: FilterCockpit): Observable<ReservationView[]> {
    filters.pagination = pagination;
    filters.sort = sorting;
    return this.bookingDataService.getReservations(filters);
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
