import { Observable } from 'rxjs/Observable';
import { OrdersData } from '../../shared/viewModels/interfaces';
import { OrderResponse } from '../../shared/viewModels/interfaces';
import { FilterOrdersCockpit } from 'app/shared/backendModels/interfaces';

export interface IPredictionService {

    getOrders(filters: FilterOrdersCockpit): Observable<OrdersData>;
    getPrediction(predictionCriteria): Observable<OrdersData>;
}
