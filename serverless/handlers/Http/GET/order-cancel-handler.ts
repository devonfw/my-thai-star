import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as business from '../../../src/logic';
import * as types from '../../../src/model/interfaces';

oasp4fn.config({
    path: '/mythaistar/services/rest/ordermanagement/v1/order/cancelorder/{id}',
    request: {
        parameters: {
            paths: {
                id: true
            }
        }
    }
});
export async function orderCancel(event: HttpEvent, context: Context, callback: Function) {
    let id: string = event.path.id;

    try {
        // para id must be defined
        if (id === undefined || typeof id === 'number') {
            throw { code: 400, message: 'No id given' };
        }

        business.cancelOrder(id, (err: types.Error) => {
            if (err) {
                callback(new Error(`[${err.code || 500}] ${err.message}`));
            } else {
                callback({ message: '[204]' });
            }
        });
    } catch (err) {
        callback(new Error(`[${err.code || 500}] ${err.message}`));
    }
}