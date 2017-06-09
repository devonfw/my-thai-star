import { CustomRequest } from '../model/interfaces';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { findUser } from '../logic';

export class Authentication {
    public constructor(private superSecret: string) {

    }

    // TODO: declarar esta funcion por algun lado y solo usarla cuando se requiera autenticacion
    // route middleware to verify a token
    public registerAuthentication = (req: CustomRequest, res: Response, next: NextFunction) => {
        // check header or url parameters or post parameters for token
        let token = req.headers.authorization;

        // decode token
        if (token) {
            token = token.split(' ')[1];

            // verifies secret and checks exp
            jwt.verify(token, this.superSecret, (err: any, decoded: any) => {
                req.user = err ? undefined : decoded;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    }

    public auth = (req: CustomRequest, res: Response) => {
        // find the user
        findUser(req.body.username).catch((err: any) => {
            res.status(err.code || 500).json({ message: err.message || 'error' });
        }).then((user) => {
            if (!user || user.length === 0) {
                res.status(403).json({ message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                if (user[0].password !== req.body.password) {
                    res.status(403).json({ message: 'Authentication failed. Wrong password.' });
                } else {
                    // if user is found and password is right
                    // create a token
                    const token = jwt.sign(user[0], this.superSecret, {
                        expiresIn: '24h', // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.header('Authorization', 'Bearer ' + token).json();
                }
            }
        });
    }

    public getCurrentUser = (req: CustomRequest, res: Response) => {
        if (req.user !== undefined) {
            res.json({ name: req.user.userName, role: req.user.role });
        } else {
            res.status(403).json();
        }
    }

    public securizedEndpoint = (role: string) => {
        return (req: CustomRequest, res: Response, next: NextFunction) => {
            if (req.user === undefined){
                res.status(403).json({ message: 'Forbidden.' });
                return;
            }

            if (req.user.role === 'WAITER' || req.user.role === role){
                next();
            } else {
                res.status(403).json({ message: 'Forbidden.' });
            }
        };
    }
}
