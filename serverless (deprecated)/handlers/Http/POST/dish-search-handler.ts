import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as types from '../../../src/model/interfaces';
import * as business from '../../../src/logic';

oasp4fn.config({ path: '/mythaistar/services/rest/dishmanagement/v1/dish/search' });
export async function dishSearch(event: HttpEvent, context: Context, callback: Function) {
    try {
        let filter = <types.FilterView>event.body;

        // Check if body contains a valid filter
        if (!types.isFilterView(filter)) {
            throw {code: 400, message: 'Invalid filter' };
        }

        // check filter values. Put the correct if neccessary
        business.checkFilter(filter);

        // get the dishes
        business.getDishes(filter, (err: types.Error, dishes: types.PaginatedList) => {
            if (err) {
                callback(new Error(`[500] ${err.message }`));
            } else {
                callback(null, dishes);
            }
        });
    } catch (error) {
        callback(new Error(`[${error.code || 500}] ${error.message}`));
    }
}