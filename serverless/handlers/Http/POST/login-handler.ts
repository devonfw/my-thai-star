import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as auth from '../../../src/utils/jwt';

oasp4fn.config({ integration: 'lambda-proxy', path: '/mythaistar/login' });
export async function login(event: HttpEvent, context: Context, callback: Function) {
    let login: { username: string, password: string } = (typeof event.body === 'string') ? JSON.parse(event.body) : event.body;
    auth.code(login.username, login.password, (l) => {
        try {
            if (l) {
                callback(null, {
                    statusCode: 204,
                    headers: {
                        'access-control-expose-headers': 'Authorization',
                        'Authorization': `Bearer ${l}`,
                    },
                    body: '',
                });
                return;
            } else {
                callback(new Error(`[403] Forbidden`), {
                    statusCode: 403,
                    body: JSON.stringify('Forbidden'),
                });
                return;
            }

        } catch (err) {
            callback(err, {
                statusCode: err.code || 500,
                body: JSON.stringify({ message: err.message }),
            });
        }
    });
}