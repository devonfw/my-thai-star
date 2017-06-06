import { Request, Response, Router as eRouter } from 'express';
import * as bussiness from '../logic';
import * as types from '../model/interfaces';
import * as moment from 'moment';
import { validEmail } from '../utils/utilFunctions';
import {lowerCase} from 'lodash';

export const router = eRouter();

router.post('/v1/booking', (req: types.CustomRequest, res: Response) => {
    // Check errors at petiton
    if (!types.isBookingPostView(req.body)) {
        res.status(400).json({ message: 'Parser data error' });
    } else if (!moment(req.body.booking.bookingDate).isValid() || moment(req.body.booking.bookingDate).diff(moment().add(1, 'hour')) < 0) {
        // check if date is future
        res.status(400).json({ message: 'Given date must be future' });
    } else if (!validEmail(req.body.booking.email as string)) {
        res.status(400).json({ message: 'Invalid email' });
    } else if (req.body.booking.bookingType === types.BookingTypes.invited && (req.body.invitedGuests === undefined || req.body.invitedGuests.length === 0)) {
        res.status(400).json({ message: 'You need to invite someone' });
    } else if (req.body.booking.bookingType === types.BookingTypes.invited &&
        (req.body.invitedGuests as types.InvitedGuestEntity[]).map((elem): boolean => {
            return !validEmail(elem.email);
        }).reduce((elem1: boolean, elem2: boolean) => {
            return elem1 || elem2;
        })) {
        res.status(400).json({ message: 'Invalid invitation email' });
    } else {
        bussiness.createBooking(req.body, req.tableCron, (err: types.Error | null, resToken?: string) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(201).json(resToken);
            }
        });
    }
});

router.get('/v1/invitedguest/accept/:token', (req: Request, res: Response) => {
    if (req.params.token === undefined) {
        res.status(400).json({ message: 'Invalid petition' });
    } else {
        bussiness.updateInvitation(req.params.token, true, (err: types.Error) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    }
});

router.get('/v1/invitedguest/decline', (req: Request, res: Response) => {
    if (req.params.token === undefined) {
        res.status(400).json({ message: 'Invalid petition' });
    } else {
        bussiness.updateInvitation(req.params.token, false, (err: types.Error) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    }
});

router.get('/v1/booking/cancel', (req: types.CustomRequest, res: Response) => {
    if (req.query.bookingToken === undefined) {
        res.status(400).json({ message: 'No booking token given' });
    } else {
        bussiness.cancelBooking(req.query.bookingToken, req.tableCron, (err: types.Error | null) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    }
});

router.post('/v1/booking/search', (req: Request, res: Response) => {
    if (!types.isSearchCriteria(req.body)) {
        res.status(400).json({ message: 'No booking token given' });
    } else {
        bussiness.searchBooking(req.body, (err: types.Error | null, bookingEntity: types.PaginatedList) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.json(bookingEntity);
            }
        });
    }
});
