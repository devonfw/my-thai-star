import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/v1/Reservation', (req: Request, res: Response) => {
    if (!types.isReservationView(req.body)) {
        res.status(400).json({error: 1});
    } else {
        bussiness.createReservation(req.body, (err: types.IError, dishes: types.IDishView[]) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(dishes);
            }
        });
    }
});
