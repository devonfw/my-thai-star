import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as business from '../../../src/logic';
import * as types from '../../../src/model/interfaces';

oasp4fn.config({
    path: '/mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/{token}',
    integration: 'lambda-proxy',
    request: {
        parameters: {
            paths: {
                token: true
            }
        }
    }
});
export async function invitedGuestAccept(event: HttpEvent, context: Context, callback: Function) {
    try {
        let token: string = event.pathParameters!.token;
        // the token must be defined
        if (token === undefined) {
            throw { code: 400, message: 'Invalid petition' };
        }

        business.updateInvitation(token, true, (err: types.Error) => {
            if (err) {
                callback(err, {
                    statusCode: err.code || 500,
                    body: JSON.stringify(err.message),
                });
            } else {
                callback(null, {
                    statusCode: 204,
                    body: ''
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