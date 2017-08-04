import { Observable } from 'rxjs/Observable';
import { OrderListView } from '../../shared/viewModels/interfaces';
import { FilterCockpit, OrderListInfo } from '../backendModels/interfaces';

export interface IOrderDataService {

    getBookingOrders(filter: FilterCockpit): Observable<OrderListView[]>;
    saveOrders(orders: OrderListInfo): Observable<number>;
    cancelOrder(token: string): Observable<number>;
}
