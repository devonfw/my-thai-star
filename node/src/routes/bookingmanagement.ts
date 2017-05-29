import { Request, Response, Router as eRouter } from 'express';
import * as bussiness from '../logic';
import * as types from '../model/interfaces';
import * as moment from 'moment';
import { validEmail } from '../utils/utilFunctions';
import {lowerCase} from 'lodash';

export const router = eRouter();

router.post('/v1/booking', (req: Request, res: Response) => {
    // check if param is correct
    if (!types.isBookingView(req.body)) {
        res.status(400).json({ message: 'Parser data error' });
    } else if (!moment(req.body.date).isValid() || moment(req.body.date).diff(moment().add(1, 'hour')) < 0) {
        // check if date is future
        res.status(400).json({ message: 'Given date must be future' });
    } else if (!validEmail(req.body.email)) {
        res.status(400).json({ message: 'Invalid email' });
    } else if (req.body.type.index === types.BookingTypes.invited && (req.body.guestList === undefined || req.body.guestList.length === 0)) {
        res.status(400).json({ message: 'You need to invite someone' });
    } else if (req.body.type.index === types.BookingTypes.invited &&
        (req.body.guestList as string[]).map((elem: any): boolean => {
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

router.get('/v1/invitedguest', (req: Request, res: Response) => {
    if (req.query.guestToken === undefined || req.query.guestResponse === undefined) {
        res.status(400).json({ message: 'Invalid petition' });
    } else {
        req.query.guestResponse = lowerCase(req.query.guestResponse) === 'true';
        bussiness.updateInvitation(req.query.guestToken, req.query.guestResponse, (err: types.IError) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    }
});

router.get('/v1/booking/cancelinvited', (req: Request, res: Response) => {
    if (req.query.reservationToken === undefined) {
        res.status(400).json({ message: 'No booking token given' });
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

// router.post('/v1/booking/search', (req: Request, res: Response) => {
//     if (req.query.reservationToken === undefined) {
//         res.status(400).json({ message: 'No booking token given' });
//     } else {
//         bussiness.searchBooking(req.query.reservationToken, (err: types.IError) => {
//             if (err) {
//                 res.status(err.code).json(err.message);
//             } else {
//                 res.status(204).json();
//             }
//         });
//     }
// });

router.post('/v1/booking/:id', (req: Request, res: Response) => {
    if (req.params.id === undefined) {
        res.status(400).json({ message: 'No booking token given' });
    } else {
        bussiness.getBookingById(req.params.id, (err: types.IError, booking?: types.IBookingView) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(200).json(booking);
            }
        });
    }
});