import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as business from '../../../src/logic';
import * as types from '../../../src/model/interfaces';
import * as auth from '../../../src/utils/jwt';

oasp4fn.config({ path: '/mythaistar/services/rest/bookingmanagement/v1/booking/search' });
export async function bookingSearch(event: HttpEvent, context: Context, callback: Function) {
    const authToken = event.headers.Authorization;
    auth.decode(authToken, (err, decoded) => {
        try {
            const search = <types.SearchCriteria>event.body;

            if (err || decoded.role !== 'WAITER') {
                throw { code: 403, message: 'Forbidden' };
            }

            // body content must be SearchCriteria
            if (!types.isSearchCriteria(search)) {
                throw { code: 400, message: 'No booking token given' };
            }

            business.searchBooking(search, (err: types.Error | null, bookingEntity: types.PaginatedList) => {
                if (err) {
                    callback(new Error(`[${err.code || 500}] ${err.message}`));
                } else {
                    callback(null, bookingEntity);
                }
            });
        } catch (err) {
            callback(new Error(`[${err.code || 500}] ${err.message}`));
        }
    });
}