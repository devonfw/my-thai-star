import { Observable } from 'rxjs/Observable';
import { OrdersData } from '../../shared/view-models/interfaces';
import { OrderResponse } from '../../shared/view-models/interfaces';
import { FilterOrdersCockpit } from 'app/shared/backend-models/interfaces';

export interface IPredictionService {

    getOrders(filters: FilterOrdersCockpit): Observable<OrdersData>;
    getPrediction(predictionCriteria): Observable<OrdersData>;
}
