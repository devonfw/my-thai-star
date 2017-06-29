import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as business from '../../../src/logic';
import * as types from '../../../src/model/interfaces';

oasp4fn.config({
    path: '/mythaistar/services/rest/bookingmanagement/v1/invitedguest/decline/{token}',
    request: {
        parameters: {
            paths: {
                token: true
            }
        }
    }
});
export async function invitedGuestDecline(event: HttpEvent, context: Context, callback: Function) {
    let token: string = event.path.token;
    try {
        // the token must be defined
        if (token === undefined) {
            throw { code: 400, message: 'Invalid petition' };
        }

        business.updateInvitation(token, false, (err: types.Error) => {
            if (err) {
                callback(new Error(`[${err.code || 500}] ${err.message}`));
            } else {
                callback({message: '[204]'});
            }
        });
    } catch (err) {
        callback(new Error(`[${err.code || 500}] ${err.message}`));
    }
}