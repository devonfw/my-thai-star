import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.get('/v1/Reservation/UpdateInvitation', (req: Request, res: Response) => {
    res.json({ todo: 'true' });
});

router.get('/v1/Reservation/CancelInvitation', (req: Request, res: Response) => {
    if (req.query.reservationToken === undefined) {
        res.status(400).json({ message: 'No reservation token given' });
    } else {
        bussiness.cancelInvitation(req.query.reservationToken, (err: types.IError) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    }
});
