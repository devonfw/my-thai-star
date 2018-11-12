import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as business from '../../../src/logic';
import * as types from '../../../src/model/interfaces';

oasp4fn.config({
    path: '/mythaistar/services/rest/ordermanagement/v1/order/cancelorder/{id}',
    integration: 'lambda-proxy',
    request: {
        parameters: {
            paths: {
                id: true
            }
        }
    }
});
export async function orderCancel(event: HttpEvent, context: Context, callback: Function) {
    try {
        let id: string = event.pathParameters!.id;

        // para id must be defined
        if (id === undefined || typeof id === 'number') {
            throw { code: 400, message: 'No id given' };
        }

        business.cancelOrder(id, (err: types.Error) => {
            if (err) {
                callback(err, {
                    statusCode: err.code || 500,
                    body: JSON.stringify(err.message),
                });
            } else {
                callback(null, {
                    statusCode: 204,
                });
            }
        });
    } catch (err) {
        callback(err, {
                    statusCode: err.code || 500,
                    body: JSON.stringify(err.message),
                });
    }
}