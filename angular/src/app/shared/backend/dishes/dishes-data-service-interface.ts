import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';

export interface IDishesDataService {

    get(): Observable<Dish[]>;

}
