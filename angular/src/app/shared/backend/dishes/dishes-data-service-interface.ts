import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';
import { Filter } from './filter';

export interface IDishesDataService {

    get(): Observable<Dish[]>;
    filter(filters: Filter): Observable<Dish[]>;

}
