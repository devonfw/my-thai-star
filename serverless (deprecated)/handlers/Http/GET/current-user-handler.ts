import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as auth from '../../../src/utils/jwt';

oasp4fn.config({
    path: '/mythaistar/services/rest/security/v1/currentuser',
});
export async function currentUser(event: HttpEvent, context: Context, callback: Function) {
    let authToken = event.headers.Authorization;
    try {
        auth.decode(authToken, (err: any, decoded?: any) => {
            if (err) {
                callback(new Error(`[403] Forbidden`));
            } else {
                callback(null, decoded);
            }
        });
    } catch (err) {
        callback(new Error(`[${err.code || 500}] ${err.message}`));
    }
}