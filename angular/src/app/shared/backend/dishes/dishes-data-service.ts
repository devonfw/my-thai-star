import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';

// Interfaces do not exist in JS, so need to use a class
export class IDishesDataService {
    get(): Observable<Dish[]>{
        throw(new Error('Should never be used, interface marker'));
    };
}
