import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';
import * as moment from 'moment';
import { validEmail } from '../utils/utilFunctions';

export const router = eRouter();

router.post('/v1/Reservation', (req: Request, res: Response) => {
    // check if param is correct
    if (!types.isReservationView(req.body)) {
        res.status(400).json({ message: 'Parser data error' });
    } else if (!moment(req.body.date).isValid() || moment(req.body.date).diff(moment().add(1, 'hour')) < 0) {
        // check if date is future
        res.status(400).json({ message: 'Given date must be future' });
    } else if (!validEmail(req.body.email)) {
        res.status(400).json({ message: 'Invalid email' });
    } else if (req.body.type.name === 'invitation' && (req.body.guestList === undefined || req.body.guestList.length === 0)) {
        res.status(400).json({ message: 'You need to invite someone' });
    } else if (req.body.type.name === 'invitation' &&
        req.body.guestList.map((elem: any): boolean => {
            return !validEmail(elem);
        }).reduce((elem1: boolean, elem2: boolean) => {
            return elem1 || elem2;
        })) {
        res.status(400).json({ message: 'Invalid invitation email' });
    } else {
        bussiness.createBooking(req.body, (err: types.IError | null, resToken?: string) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                // TODO: send emails to all
                res.status(201).json(resToken);
            }
        });
    }
});
