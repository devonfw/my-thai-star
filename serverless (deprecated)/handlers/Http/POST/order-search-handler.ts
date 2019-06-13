import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as business from '../../../src/logic';
import { SearchCriteria, isSearchCriteria, Error } from '../../../src/model/interfaces';
import * as auth from '../../../src/utils/jwt';

oasp4fn.config({ path: '/mythaistar/services/rest/ordermanagement/v1/order/search' });
export async function orderSearch(event: HttpEvent, context: Context, callback: Function) {
    const authToken = event.headers.Authorization;
    auth.decode(authToken, (err, decoded) => {
        try {
            const searchCriteria = <SearchCriteria>event.body;
            if (err || decoded.role !== 'WAITER') {
                throw { code: 403, message: 'Forbidden' };
            }

            // body content must be SearchCriteria
            if (!isSearchCriteria(searchCriteria)) {
                throw { code: 400, message: 'Parse error' };
            }

            business.getOrders(searchCriteria.pagination, (err, result) => {
                if (err) {
                    callback(new Error(`[${err.code || 500}] ${err.message}`));
                } else {
                    callback(null, result);
                }
            }, searchCriteria.sort);
        } catch (err) {
            callback(new Error(`[${err.code || 500}] ${err.message}`));
        }
    });
}