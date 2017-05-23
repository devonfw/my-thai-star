import { Filter } from '../backendModels/interfaces';
import { DishView } from '../../viewModels/interfaces';
import { Observable } from 'rxjs/Observable';

export interface IDishesDataService {

    get(): Observable<DishView[]>;
    filter(filters: Filter): Observable<DishView[]>;

}
