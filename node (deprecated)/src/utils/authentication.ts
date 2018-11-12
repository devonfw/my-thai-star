import { CustomRequest } from '../model/interfaces';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { findUser } from '../logic';

export class Authentication {
    public constructor(private superSecret: string) {

    }

    // route middleware to verify a token
    public registerAuthentication = (req: CustomRequest, res: Response, next: NextFunction) => {
        // check header or url parameters or post parameters for token
        let token = req.headers.authorization as string;

        // decode token
        if (token) {
            token = token.split(' ')[1];

            // verifies secret and checks exp
            jwt.verify(token, this.superSecret, (err: any, decoded: any) => {
                if (err){
                    res.status(500).json({message: err.message});
                    return;
                }

                req.user = decoded;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    }

    /**
     * Login
     *
     * @memberof Authentication
     */
    public auth = (req: CustomRequest, res: Response) => {
        // find the user
        findUser(req.body.username).then((user) => {
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
                        expiresIn: '1h', // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.header('Authorization', 'Bearer ' + token).status(204).json();
                }
            }
        }).catch((err: any) => {
            res.status(err.code || 500).json({ message: err.message || 'error' });
        });
    }

    public getCurrentUser = (req: CustomRequest, res: Response) => {
        if (req.user !== undefined) {
            res.json({ name: req.user.userName, role: req.user.role });
        } else {
            res.status(403).json();
        }
    }

    public changePassword = (req: CustomRequest, res: Response) => {
        // TODO: implement this method
        req.body.newPassword;
        req.body.oldPassword;
        req.body.username;
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
