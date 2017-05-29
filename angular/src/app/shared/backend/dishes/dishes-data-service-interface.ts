import { Filter } from '../backendModels/interfaces';
import { DishView } from '../../viewModels/interfaces';
import { Observable } from 'rxjs/Observable';

export interface IDishesDataService {

    filter(filters: Filter): Observable<DishView[]>;

}
