import { Request, Response, Router as eRouter } from 'express';
import * as bussiness from '../logic';
import * as types from '../model/interfaces';
import * as moment from 'moment';
import { validEmail } from '../utils/utilFunctions';
import { lowerCase } from 'lodash';

export const router = eRouter();

router.post('/v1/booking', (req: types.CustomRequest, res: Response) => {
    try {
        // Check errors at petiton
        if (!types.isBookingPostView(req.body)) {
            throw { code: 400, message: 'Parser data error' };
        }

        // check if date is future
        if (!moment(req.body.booking.bookingDate).isValid() || moment(req.body.booking.bookingDate).diff(moment().add(1, 'hour')) < 0) {
            throw { code: 400, message: 'Given date must be future' };
        }

        // check if valid email is given
        if (!validEmail(req.body.booking.email as string)) {
            throw { code: 400, message: 'Invalid email' };
        }

        // if bookingType = 1 property invitedGuest must be defined
        if (req.body.booking.bookingType === types.BookingTypes.invited && (req.body.invitedGuests === undefined || req.body.invitedGuests.length === 0)) {
            throw { message: 'You need to invite someone' };
        }

        // if bookingType = 1 all invitedGuest email must be valid
        if (req.body.booking.bookingType === types.BookingTypes.invited &&
            (req.body.invitedGuests as types.InvitedGuestEntity[]).map((elem): boolean => {
                return !validEmail(elem.email);
            }).reduce((elem1: boolean, elem2: boolean) => {
                return elem1 || elem2;
            })) {
            throw { code: 400, message: 'Invalid invitation email' };
        }

        // if no errors, create booking
        bussiness.createBooking(req.body, req.tableCron, (error: types.Error | null, resToken?: string): void => {
            if (error) {
                res.status(error.code || 500).json({ message: error.message });
            } else {
                console.log(resToken);
                res.status(201).json(resToken);
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.get('/v1/invitedguest/accept/:token', (req: Request, res: Response) => {
    try {
        // the token must be defined
        if (req.params.token === undefined) {
            throw { code: 400, message: 'Invalid petition' };
        }

        bussiness.updateInvitation(req.params.token, true, (err: types.Error) => {
            if (err) {
                res.status(err.code || 500).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.get('/v1/invitedguest/decline', (req: Request, res: Response) => {
    try {
        // the token must be defined
        if (req.params.token === undefined) {
            throw { code: 400, message: 'Invalid petition' };
        }

        bussiness.updateInvitation(req.params.token, false, (err: types.Error) => {
            if (err) {
                res.status(err.code || 500).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.get('/v1/booking/cancel', (req: types.CustomRequest, res: Response) => {
    try {
        // the token must be defined
        if (req.query.bookingToken === undefined) {
            throw { code: 400, message: 'No booking token given' };
        }

        bussiness.cancelBooking(req.query.bookingToken, req.tableCron, (err: types.Error | null) => {
            if (err) {
                res.status(err.code || 500).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.post('/v1/booking/search', (req: Request, res: Response) => {
    try {
        // body content must be SearchCriteria
        if (!types.isSearchCriteria(req.body)) {
            throw {code: 400, message: 'No booking token given' };
        }

        bussiness.searchBooking(req.body, (err: types.Error | null, bookingEntity: types.PaginatedList) => {
            if (err) {
                res.status(err.code || 500).json(err.message);
            } else {
                res.json(bookingEntity);
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});
