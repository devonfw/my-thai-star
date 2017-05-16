import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';
import * as moment from 'moment';

export const router = eRouter();

router.post('/v1/Reservation', (req: Request, res: Response) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // check if param is correct
    if (!types.isReservationView(req.body)) {
        res.status(400).json({error: 1});
    } else if (!moment(req.body.date).isValid() || moment(req.body.date).diff(moment()) < 0){
        // check if date is future
        res.status(400).json({error: 2});
    } else if (!req.body.email.match(mailformat)){
        // check valid email
        res.status(400).json({error: 3});
    } else {
        bussiness.createReservation(req.body, (err: types.IError, dishes: string) => {
            if (err) {
                res.status(500).json(err);
            } else {
                // TODO: send email
                res.json(dishes);
            }
        });
    }
});
