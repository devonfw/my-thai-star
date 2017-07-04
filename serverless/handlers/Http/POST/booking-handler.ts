import oasp4fn from '@oasp/oasp4fn';
import { HttpEvent, Context } from '../../types';
import * as business from '../../../src/logic';
import * as types from '../../../src/model/interfaces';
import * as moment from 'moment';
import { validEmail } from '../../../src/utils/utilFunctions';
import { lowerCase, isInteger } from 'lodash';

oasp4fn.config({ path: '/mythaistar/services/rest/bookingmanagement/v1/booking', integration: 'lambda-proxy' });
export async function booking(event: HttpEvent, context: Context, callback: Function) {
    try {
        let booking: types.BookingPostView = (typeof event.body === 'string') ? JSON.parse(event.body) : event.body;
        // Check errors at petiton
        if (!types.isBookingPostView(booking)) {
            throw { code: 400, message: 'Parser data error' };
        }

        // check if date is future
        if (!moment(booking.booking.bookingDate).isValid() || moment(booking.booking.bookingDate).diff(moment().add(1, 'hour')) < 0) {
            throw { code: 400, message: 'Given date must be future' };
        }

        // check if valid email is given
        if (!validEmail(booking.booking.email as string)) {
            throw { code: 400, message: 'Invalid email' };
        }

        if (booking.booking.bookingType === types.BookingTypes.booking && booking.booking.assistants! < 1 && !isInteger(booking.booking.assistants)) {
            throw { code: 400, message: 'Assistants must be a number greater than 1' };
        }

        // if bookingType = 1 property invitedGuest must be defined
        if (booking.booking.bookingType === types.BookingTypes.invited && (booking.invitedGuests === undefined || booking.invitedGuests.length === 0)) {
            throw { message: 'You need to invite someone' };
        }

        // if bookingType = 1 all invitedGuest email must be valid
        if (booking.booking.bookingType === types.BookingTypes.invited &&
            (booking.invitedGuests as types.InvitedGuestEntity[]).map((elem): boolean => {
                return !validEmail(elem.email);
            }).reduce((elem1: boolean, elem2: boolean) => {
                return elem1 || elem2;
            })) {
            throw { code: 400, message: 'Invalid invitation email' };
        }

        // if no errors, create booking
        business.createBooking(booking, (error: types.Error | null, resToken?: string): void => {
            if (error) {
                callback(error, {
                    statusCode: error.code || 500,
                    body: JSON.stringify(error.message),
                });
            } else {
                callback(null, {
                    statusCode: 201,
                    body: JSON.stringify(resToken),
                });
            }
        }, undefined);
    } catch (err) {
        callback(err, {
            statusCode: err.code || 500,
            body: JSON.stringify(err.message),
        });
    }
}