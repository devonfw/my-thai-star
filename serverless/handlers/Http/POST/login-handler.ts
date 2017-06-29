import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as auth from '../../utils';

oasp4fn.config({ integration: 'lambda-proxy', path: '/mythaistar/login' });
export async function login(event: HttpEvent, context: Context, callback: Function) {
    try {
        let login: { username: string, password: string } = JSON.parse(event.body);
        auth.code(login.username, login.password, (l) => {
            if (l) {
                callback(null, {
                    statusCode: 204,
                    headers: {
                        'access-control-expose-headers': 'Authorization',
                        'Authorization': `Bearer ${l}`,
                    },
                    body: '',
                });
            } else {
                callback(null, {
                    statusCode: 403,
                    body: '"Forbidden"',
                });
            }
        });

    } catch (err) {
        callback(null, {
            statusCode: err.code || 500,
            body: {message: err.message},
        });
    }
}