import * as jwt from 'jsonwebtoken';
import { findUser } from '../logic';

const superSecret = 'MyThaiStarSecret';

// route middleware to verify a token
export function decode(authorization: string, cb: (err: any, decoded?: any) => void): void {
    // check header or url parameters or post parameters for token
    let token = authorization;

    // decode token
    if (token) {
        token = token.split(' ')[1];

        // verifies secret and checks exp
        jwt.verify(token, superSecret, cb);
    } else {
        cb('Error');
    }
}

export async function code(username: string, password: string, cb: (s: any) => void) {
    // find the user
    findUser(username).then((user) => {
        if (!user || user.length === 0) {
            cb(undefined);
            return;
        } else if (user) {
            // check if password matches
            if (user[0].password !== password) {
                cb(undefined);
                return;
            } else {
                // if user is found and password is right
                // create a token
                const token = jwt.sign(user[0], superSecret, {
                    expiresIn: '1h', // expires in 24 hours
                });

                // return the information including token as JSON
                cb(token);
                return;
            }
        }
    }).catch((err: any) => {
        cb(undefined);
    });
}
