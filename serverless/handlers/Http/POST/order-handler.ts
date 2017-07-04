import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as business from '../../../src/logic';
import { OrderPostView, isOrderPostView, Error} from '../../../src/model/interfaces';

oasp4fn.config({path: '/mythaistar/services/rest/ordermanagement/v1/order', integration: 'lambda-proxy'});
export async function order (event: HttpEvent, context: Context, callback: Function) {
    try {
        let order: OrderPostView = <OrderPostView>JSON.parse(event.body);

        // The booking token must be defined
        if (order.booking === undefined || order.booking.bookingToken === undefined) {
            throw { code: 400, message: 'No booking token given' };
        }

        // body content must be an OrderPostView
        if (!isOrderPostView(order)) {
            throw { code: 400, message: 'Parser error' };
        }

        if (order.orderLines === undefined || order.orderLines.length === 0) {
            throw { code: 400, message: 'Empty order' };
        }

        business.createOrder(order, (err: Error, orderReference?: any) => {
            if (err) {
                callback(null, {
                    statusCode: err.code || 500,
                    body: JSON.stringify(err.message),
                });
            } else {
                callback(null, {
                    statusCode: 201,
                    body: JSON.stringify(orderReference),
                });
            }
        });
    } catch (err) {
        callback(null, {
                    statusCode: err.code || 500,
                    body: JSON.stringify(err.message)
                });
    }
}