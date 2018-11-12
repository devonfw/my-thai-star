import { Request, Response, Router as eRouter } from 'express';
import * as business from '../logic';
import * as types from '../model/interfaces';
import * as moment from 'moment';
import { validEmail } from '../utils/utilFunctions';
import { lowerCase, isInteger } from 'lodash';

export const router = eRouter();

router.post('/booking', (req: types.CustomRequest, res: Response) => {
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

        if (req.body.booking.bookingType === types.BookingTypes.booking && req.body.booking.assistants! < 1 && !isInteger(req.body.booking.assistants)) {
            throw { code: 400, message: 'Assistants must be a number greater than 1' };
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
        business.createBooking(req.body, (error: types.Error | null, resToken?: string): void => {
            if (error) {
                res.status(error.code || 500).json({ message: error.message });
            } else {
                res.status(201).json(resToken);
            }
        }, req.user);
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.get('/invitedguest/accept/:token', (req: Request, res: Response) => {
    try {
        // the token must be defined
        if (req.params.token === undefined) {
            throw { code: 400, message: 'Invalid petition' };
        }

        business.updateInvitation(req.params.token, true, (err: types.Error) => {
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

router.get('/invitedguest/decline/:token', (req: Request, res: Response) => {
    try {
        // the token must be defined
        if (req.params.token === undefined) {
            throw { code: 400, message: 'Invalid petition' };
        }

        business.updateInvitation(req.params.token, false, (err: types.Error) => {
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

router.get('/booking/cancel/:token', (req: types.CustomRequest, res: Response) => {
    try {
        // the token must be defined
        if (req.params.token === undefined) {
            throw { code: 400, message: 'Invalid petition' };
        }

        business.cancelBooking(req.params.token, (err: types.Error | null) => {
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

router.post('/booking/search', (req: types.CustomRequest, res: Response) => {
    try {
        // body content must be SearchCriteria
        if (!types.isSearchCriteria(req.body)) {
            throw {code: 400, message: 'No booking token given' };
        }

        business.searchBooking(req.body, (err: types.Error | null, bookingEntity: types.PaginatedList) => {
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
