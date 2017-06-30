import { NumberAttributeValue } from 'aws-sdk/clients/dynamodbstreams';
import { Credentials } from 'aws-sdk';
import { ActionConfigurationPropertyList } from 'aws-sdk/clients/codepipeline';
import { AccessControlPolicy } from 'aws-sdk/clients/s3';
import * as _ from 'lodash';
import dynamo from '@oasp/oasp4fn/dist/adapters/fn-dynamo';
import oasp4fn from '@oasp/oasp4fn';
import * as dbtypes from './model/database';
import * as types from './model/interfaces';
import * as util from './utils/utilFunctions';
import * as moment from 'moment';
import * as md5 from 'md5';
import { Mailer } from './utils/mailer';
import * as serverConfig from './config';

//? Dynamo
let creds;
if (!process.env.MODE || process.env.MODE!.trim() !== 'test') {
    creds = new Credentials('akid', 'secret', 'session');
    oasp4fn.setDB(dynamo, { endpoint: serverConfig.databaseURL, region: 'us-west-2', credentials: creds });
} else {
    creds = new Credentials('akid2', 'secret2', 'session2');
    oasp4fn.setDB(dynamo, { endpoint: serverConfig.databaseURL, region: 'us-west-2', credentials: creds });
}

const maxPrice = 50;

export async function findUser(userName: string): Promise<dbtypes.User[]> {
    const roles = await oasp4fn.table('UserRole').reduce((acum: any, elem: any) => {
        acum[elem.id] = elem;
        return acum;
    }, {}).promise() as { [index: string]: dbtypes.UserRole };

    return oasp4fn.table('User').map((elem: dbtypes.User) => {
        const newElem = elem;
        newElem.userName = elem.userName.toLowerCase();
        newElem.role = roles[elem.role].name.toUpperCase();
        return newElem;
    }).where('userName', userName.toLowerCase(), '=').first().promise() as Promise<dbtypes.User[]>;
}

//! /////////////////// Dishes /////////////////////////////////////////////////////////////////////////////////////////
export async function getDishes(filter: types.FilterView,
                                callback: (err: types.Error | null, dishes?: types.PaginatedList) => void) {
    try {
        // filter by category
        const catId: string[] | undefined = (filter.categories === null || filter.categories === undefined || filter.categories.length === 0) ?
            undefined :
            filter.categories.map((elem) => elem.id.toString());

        let dishCategories: string[] = [];
        let dishIdSet: Set<string> | undefined;

        // get the dish ids if we are filtering by category
        if (catId) {
            const dishCatObject = await oasp4fn.table('DishCategory').
                filter((elem: dbtypes.DishCategory) => _.includes(catId, elem.idCategory)).
                reduce((acum: any, elem: any) => {
                    if (acum.hasOwnProperty(elem.idDish)) {
                        acum[elem.idDish].categories.push(elem.idCategory);
                    } else {
                        acum[elem.idDish] = { id: elem.idDish, categories: [elem.idCategory] };
                    }
                    return acum;
                }, {}).
                promise() as { [propName: string]: {}[] };

            dishCategories = _.filter(_.values(dishCatObject), _.matchesProperty('categories', catId)).map((elem) => elem.id);
            console.log(dishCategories);
            dishIdSet = new Set(dishCategories);

        }

        //? filter by fav
        //TODO: check if user is correct
        // if (filter.isFab) {
        //     const fav: dbtypes.User = await oasp4fn.table('User', '1').
        //         promise() as dbtypes.User;

        //     const s2: Set<string> = new Set(fav.favourites as string[]);

        //     dishIdSet = (dishIdSet !== undefined) ? util.setIntersection(dishIdSet, s2) : s2;
        // }

        // get dishes from database
        if (dishIdSet === undefined || dishIdSet.size > 0) {
            const ingredients: dbtypes.Ingredient[] = await oasp4fn.table('Ingredient').promise() as dbtypes.Ingredient[];

            let dishes: types.DishesView[] = await oasp4fn.
                table('Dish', (dishIdSet !== undefined) ? [...dishIdSet] : undefined).
                where('price', filter.maxPrice, '<=').
                filter((o: any) => {
                    return _.lowerCase(o.name).includes(_.lowerCase(filter.searchBy))
                        || _.lowerCase(o.description).includes(_.lowerCase(filter.searchBy));
                }).
                map(util.relationArrayOfIds(ingredients, 'extras', 'id')).
                map(dishToDishesview()).
                // orderBy(filter.sortBy[0].name, _.lowerCase(filter.sortBy[0].direction)).
                promise() as types.DishesView[];

            if (filter.sort !== undefined && filter.sort.length > 0) {
                dishes = _.orderBy(dishes, filter.sort.map((elem: types.SortByView) => 'dish.' + elem.name), filter.sort.map((elem: types.SortByView) => _.lowerCase(elem.direction)));
            }

            callback(null, util.getPagination(500, 1, dishes));
        } else {
            callback(null, util.getPagination(0, 1, []));
        }

    } catch (error) {
        console.error(error);
        callback({ code: 500, message: error.message });
    }
}

//! /////////////////// BOOKING /////////////////////////////////////////////////////////////////////////////////////////

export async function createBooking(reserv: types.BookingPostView,
                                    callback: (error: types.Error | null, booToken?: string) => void, user?: dbtypes.User) {
    const date = moment();
    const bookDate = moment(reserv.booking.bookingDate);

    let table;
    try {
        if (reserv.booking.bookingType === types.BookingTypes.booking) {
            table = await getFreeTable(reserv.booking.bookingDate as string, reserv.booking.assistants as number + 1);

            if (table === 'error') {
                throw { code: 400, message: 'No more tables' };
            }
        }

        const booking: dbtypes.Booking = {
            id: util.getNanoTime().toString(),
            userId: (user !== undefined) ? user.id : undefined,
            name: reserv.booking.name as string,
            email: reserv.booking.email as string,
            bookingToken: 'CB_' + moment().format('YYYYMMDD') + '_' + md5(reserv.booking.email + moment().format('YYYYMMDDHHmmss')),
            bookingDate: reserv.booking.bookingDate as string,
            expirationDate: bookDate.subtract(1, 'hour').toJSON(),
            creationDate: date.toJSON(),
            canceled: false,
            bookingType: reserv.booking.bookingType as number,
            assistants: (reserv.booking.bookingType === types.BookingTypes.booking) ? Math.floor(reserv.booking.assistants!) : undefined,
            table: (reserv.booking.bookingType === types.BookingTypes.booking) ? table : undefined,
        };

        const inv: dbtypes.InvitedGuest[] = [];

        if (reserv.booking.bookingType === types.BookingTypes.invited && (reserv.invitedGuests as types.InvitedGuestEntity[]).length > 0) {
            // remove possible duplicates
            const emails: Set<string> = new Set((reserv.invitedGuests as types.InvitedGuestEntity[]).map((elem) => elem.email));

            emails.forEach((elem: string) => {
                const now = moment();
                inv.push({
                    id: util.getNanoTime().toString(),
                    idBooking: booking.id,
                    guestToken: 'GB_' + now.format('YYYYMMDD') + '_' + md5(elem + now.format('YYYYMMDDHHmmss')),
                    email: elem,
                    modificationDate: now.toJSON(),
                    order: undefined,
                });
            });

            booking.guestList = inv.map((elem: any): string => elem.id);
        }

        await oasp4fn.insert('Booking', booking).promise();

        if (reserv.booking.bookingType === types.BookingTypes.invited && inv.length > 0) {
            try {
                await oasp4fn.insert('InvitedGuest', inv).promise();
            } catch (error) {
                console.error(error);
                callback({ code: 500, message: error.message });
                undoChanges('delete', 'Booking', booking.id);
                return;
            }
        }

        callback(null, booking.bookingToken);

        try {
            if (serverConfig.mailConfig === serverConfig.MailType.api || serverConfig.mailConfig === serverConfig.MailType.both) {
                if (reserv.booking.bookingType === types.BookingTypes.booking) {
                    const config: types.EmailContent = {
                        emailFrom: 'MyThaiStar',
                        emailType: 0,
                        bookingDate: reserv.booking.bookingDate,
                        assistants: reserv.booking.assistants,
                        emailAndTokenTo: {},
                        bookingToken: booking.bookingToken,
                    };

                    (config.emailAndTokenTo as { [index: string]: string })[booking.bookingToken] = booking.email;

                    Mailer.sendEmail(config);
                } else {
                    const configHost: types.EmailContent = {
                        emailFrom: 'MyThaiStar',
                        emailType: 2,
                        bookingDate: reserv.booking.bookingDate,
                        emailAndTokenTo: {},
                        buttonActionList: {},
                        bookingToken: booking.bookingToken,
                        host: {},
                    };

                    (configHost.buttonActionList as { [index: string]: string })[serverConfig.frontendURL + '/booking/cancel/' + booking.bookingToken] = 'Cancel';
                    (configHost.host as { [index: string]: string })[booking.email] = booking.name;
                    (configHost.emailAndTokenTo as { [index: string]: string })[booking.bookingToken] = booking.email;
                    inv.forEach((elem) => {
                        (configHost.emailAndTokenTo as { [index: string]: string })[elem.guestToken] = elem.email;
                    });

                    Mailer.sendEmail(configHost);

                    //TODO: send the guest emails
                    // (booking.guestList as string[]).forEach((elem: string) => {
                    //     const email = pug.renderFile('./src/emails/createInvitationGuest.pug', {
                    //         title: 'You have been invited',
                    //         email: elem,
                    //         name: reserv.booking.name,
                    //         hostEmail: reserv.booking.email,
                    //         date: bookDate.format('YYYY-MM-DD'),
                    //         hour: bookDate.format('HH:mm:ss'),
                    //         guest: booking.guestList,
                    //         urlAcept: '#',
                    //         urlCancel: '#',
                    //     });

                    //     mailer.sendEmail(null, elem, '[MyThaiStar] Your have a new invitation', email, email);
                    // });
                }
            } else if (serverConfig.mailConfig === serverConfig.MailType.mock || serverConfig.mailConfig === serverConfig.MailType.both) {
                if (reserv.booking.bookingType === types.BookingTypes.booking) {
                    console.log(
                        `New booking created:
  Email: ${reserv.booking.email}
  Date: ${reserv.booking.bookingDate}
  Assistants: ${reserv.booking.assistants}
  Token: ${booking.bookingToken}`);
                } else {
                    console.log(
                        `New booking created:
  Host email: ${reserv.booking.email}
  Date: ${reserv.booking.bookingDate}
  Token: ${booking.bookingToken}
  Cancel button: ${serverConfig.frontendURL + '/booking/cancel/' + booking.bookingToken}
  Guest List: ${reserv.invitedGuests!.map((elem) => elem.email)}
  Guest Buttons:
    Accept:
 ` +
                        inv.map((elem) => '      ' + serverConfig.frontendURL + '/booking/acceptInvite/' + elem.guestToken + '\n') +
                        '    Cancel: \n ' +
                        inv.map((elem) => '      ' + serverConfig.frontendURL + '/booking/rejectInvite/' + elem.guestToken + '\n'));
                }
            }
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
        callback(error);
    }
}

export async function updateBookingWithTable(id: string, table: string) {
    try {
        const book = await oasp4fn.table('Booking', id).promise() as dbtypes.Booking;

        book.table = table;

        await oasp4fn.insert('Booking', book).promise();
        // return true if error
        return false;
    } catch (error) {
        return true;
    }
}

export function getAllInvitedBookings(date?: string): Promise<dbtypes.Booking[]> {
    return oasp4fn.table('Booking').filter((o: dbtypes.Booking) => {
        let res = (o.canceled === undefined || o.canceled === false) && o.bookingType === types.BookingTypes.invited;

        if (date === undefined) res = res && moment(o.bookingDate).isAfter(moment().add(1, 'hour'));
        else res = res && date === o.bookingDate;

        return res;
    }).promise() as Promise<dbtypes.Booking[]>;
}

export async function getAssistansForInvitedBooking(id: string) {
    const book = await oasp4fn.table('InvitedGuest').where('idBooking', id, '=').
        filter((elem: dbtypes.InvitedGuest) => elem.accepted).promise() as dbtypes.InvitedGuest[];

    return book.length + 1;
}

export async function searchBooking(searchCriteria: types.SearchCriteria,
                                    callback: (err: types.Error | null, bookingEntity?: types.PaginatedList) => void) {
    try {
        let result: any = oasp4fn.table('Booking');

        if (searchCriteria.email) {
            result = result.where('email', searchCriteria.email, '=');
        }
        if (searchCriteria.bookingToken) {
            result = result.where('bookingToken', searchCriteria.bookingToken, '=');
        }

        const [booking, invitedGuest]: [dbtypes.Booking[], { [index: string]: dbtypes.InvitedGuest }] = await Promise.all([result.filter((elem: dbtypes.Booking) => moment(elem.bookingDate).diff(moment()) > 0).orderBy('bookingDate', 'asc').promise() as dbtypes.Booking[],
        oasp4fn.table('InvitedGuest').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise() as any]);

        result = booking.map((elem) => {
            return {
                booking: {
                    id: Number(elem.id),
                    name: elem.name,
                    bookingToken: elem.bookingToken,
                    email: elem.email,
                    bookingDate: elem.bookingDate,
                    creationDate: elem.creationDate,
                    assistants: elem.assistants,
                    tableId: elem.table,
                },
                invitedGuests: (elem.guestList === undefined) ? [] : elem.guestList.map((elem2) => {
                    return {
                        email: invitedGuest[elem2].email,
                        guestToken: invitedGuest[elem2].guestToken,
                        accepted: (invitedGuest[elem2].accepted) ? invitedGuest[elem2].accepted : false,
                    };
                }),
            };
        });

        if (searchCriteria.sort) {
            result = _.orderBy(result, searchCriteria.sort.map((elem) => `booking.${elem.name}`), searchCriteria.sort.map((elem) => elem.direction.toLowerCase()));
        }

        callback(null, util.getPagination(searchCriteria.pagination.size, searchCriteria.pagination.page, result));
    } catch (error) {
        callback(error);
    }
}

export async function cancelBooking(token: string, callback: (err: types.Error | null) => void) {
    let reg: dbtypes.Booking[];
    try {
        reg = await oasp4fn.table('Booking').where('bookingToken', token, '=').promise() as dbtypes.Booking[];

        // errors ////////////////////////////////////////////////////////
        if (reg.length === 0) {
            throw { code: 400, message: 'Invalid token given' };
        }

        if (reg[0].bookingType !== types.BookingTypes.invited) {
            throw { code: 400, message: 'You can\'t cancel the booking' };
        }

        const bookingDate = moment(reg[0].bookingDate);
        if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
            throw { code: 400, message: 'You can\'t cancel the booking at this time' };
        }

        if (reg[0].canceled) {
            throw { code: 400, message: 'Already canceled' };
        }
        // end errors ////////////////////////////////////////////////////////

        await oasp4fn.delete('Booking', reg[0].id).promise();
        // tableCron.unregisterInvitation(reg[0].id);

        let guest;

        try {
            if (reg[0].guestList !== undefined && (reg[0].guestList as string[]).length > 0) {
                guest = await oasp4fn.table('InvitedGuest', (reg[0].guestList as string[])).promise() as dbtypes.InvitedGuest[];
                await oasp4fn.delete('InvitedGuest', (reg[0].guestList as string[])).promise() as dbtypes.InvitedGuest[];
            }
        } catch (err) {
            console.error(err);
            callback(err);
            undoChanges('insert', 'Booking', reg[0]);
            return;
        }

        try {
            await oasp4fn.table('Order').where('idBooking', reg[0].id, '=').promise();
        } catch (err) {
            console.error(err);
            callback(err);
            undoChanges('insert', 'Booking', reg[0]);
            if (guest !== undefined) {
                undoChanges('insert', 'InvitedGuest', guest);
            }
            return;
        }

        callback(null);

        try {
            if (serverConfig.mailConfig === serverConfig.MailType.api || serverConfig.mailConfig === serverConfig.MailType.both) {
                //TODO: send email
                // mailer.sendEmail(null, reg[0].email, '[MyThaiStar] Invitation canceled', undefined, pug.renderFile('./src/emails/order.pug', {
                //     title: 'Invitation canceled',
                //     name: reg[0].name,
                // }));

                // if (guest !== undefined) {
                //     guest.forEach((elem: any) => {
                //         mailer.sendEmail(elem.email, '[MyThaiStar] Invitation canceled', undefined, pug.renderFile('./src/emails/order.pug', {
                //             title: 'Invitation canceled',
                //             name: elem.email,
                //         }));
                //     });
                // }
            } else if (serverConfig.mailConfig === serverConfig.MailType.mock || serverConfig.mailConfig === serverConfig.MailType.both) {
                console.log(`Booking canceled: ${token}`);
            }
        } catch (err) {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }
}

export async function updateInvitation(token: string, response: boolean, callback: (err: types.Error | null) => void) {
    let reg: dbtypes.InvitedGuest[];
    let booking;
    try {
        reg = await oasp4fn.table('InvitedGuest').where('guestToken', token, '=').promise() as dbtypes.InvitedGuest[];

        // errors //////////////////////////////////////////////
        if (reg.length === 0) {
            throw { code: 400, message: 'Invalid token given' };
        }

        if (reg[0].accepted !== undefined && reg[0].accepted === false) {
            throw { code: 400, message: 'The invitation is canceled, you can\'t do any modification' };
        }

        if (reg[0].accepted !== undefined && reg[0].accepted === true && response === true) {
            throw { code: 400, message: 'Already accepted' };
        }

        booking = await oasp4fn.table('Booking', reg[0].idBooking).promise() as dbtypes.Booking;
        if (moment(booking.bookingDate).diff(moment().add(10, 'minutes')) < 0) {
            throw { code: 500, message: 'You can\'t do this operation at this moment' };
        }

        // end errors //////////////////////////////////////////////

        const { accepted: oldAccepted, modificationDate: oldModificationDate } = reg[0];
        reg[0].accepted = response;
        reg[0].modificationDate = moment().toJSON();

        await oasp4fn.insert('InvitedGuest', reg[0]).promise();

        try {
            if (response === false && oldAccepted !== undefined && oldAccepted === true) {
                await oasp4fn.table('Order').where('idInvitedGuest', reg[0].id).project('id').delete().promise();
            }
        } catch (err) {
            console.error(err);
            reg[0].accepted = oldAccepted;
            reg[0].modificationDate = oldModificationDate;
            callback(err);
            undoChanges('insert', 'InvitedGuest', reg[0]);
            return;
        }

        try {
            if (response === false && oldAccepted !== undefined && oldAccepted === true && moment(booking.bookingDate).diff(moment().add(1, 'hour')) < 0) {
                const assist = await getAssistansForInvitedBooking(booking.id);
                const newTable = await getFreeTable(booking.bookingDate, assist, booking.table);

                if (newTable !== booking.table) {
                    await updateBookingWithTable(booking.id, newTable);
                }
            }
        } catch (err) {
            console.error(err);
        }

        callback(null);

        try {
            if (serverConfig.mailConfig === serverConfig.MailType.api || serverConfig.mailConfig === serverConfig.MailType.both) {
                //TODO: send mails
            } else if (serverConfig.mailConfig === serverConfig.MailType.mock || serverConfig.mailConfig === serverConfig.MailType.both) {
                console.log(`InvitedGuest ${token} status updated to: ${response}`);
            }
        } catch (err) {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }
}

//! /////////////////// ORDERS /////////////////////////////////////////////////////////////////////////////////////////

export async function createOrder(order: types.OrderPostView, callback: (err: types.Error | null, orderReference?: any) => void) {

    // check if exsist the token
    let reg: any[];

    try {

        if (order.booking.bookingToken.startsWith('CB')) {
            reg = await oasp4fn.table('Booking').where('bookingToken', order.booking.bookingToken, '=').promise() as dbtypes.Booking[];
        } else {
            reg = await oasp4fn.table('InvitedGuest').where('guestToken', order.booking.bookingToken, '=').promise() as dbtypes.InvitedGuest[];
        }

        // Possible errors
        // Not found
        if (reg.length === 0) {
            throw { code: 400, message: 'Invalid booking token given' };
        }

        if (order.booking.bookingToken.startsWith('CB')) {
            // booking canceled
            if (reg[0].canceled !== undefined && reg[0].canceled === true) {
                throw { code: 400, message: 'The booking is canceled' };
            }

            // less than 1 hour to the booking date
            const bookingDate = moment(reg[0].bookingDate);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                throw { code: 400, message: 'You can not create the order at this time' };
            }
        } else {
            // invitation not acepted
            if (reg[0].accepted !== true) {
                throw { code: 400, message: 'You must confirm' };
            }

            const reg2 = await oasp4fn.table('Booking', reg[0].idBooking).promise() as dbtypes.Booking;
            // booking canceled
            if (reg2.canceled !== undefined && reg2.canceled === true) {
                throw { code: 400, message: 'The booking is canceled' };
            }

            // less than 1 hour to the booking date
            const bookingDate = moment(reg2.bookingDate);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                throw { code: 400, message: 'You can not create the at this time' };
            }
        }

        // Order already registered
        if (reg[0].order !== undefined) {
            throw { code: 400, message: 'You have a order, cant create a new one' };
        }

        // The object which will be save into database
        const ord: dbtypes.Order = {
            id: util.getNanoTime().toString(),
            lines: (order.orderLines.length > 0) ? order.orderLines.map((elem: types.OrderLinesView): dbtypes.OrderLine => {
                return {
                    idDish: elem.orderLine.dishId.toString(),
                    extras: (elem.extras.length > 0) ? elem.extras.map((elem2: types.ExtraIngredientView) => elem2.id.toString()) : [],
                    amount: elem.orderLine.amount,
                    comment: (elem.orderLine.comment === '') ? undefined : elem.orderLine.comment,
                };
            }) : [],
            idBooking: (reg[0].idBooking !== undefined) ? reg[0].idBooking : reg[0].id,
            idInvitedGuest: (reg[0].idBooking !== undefined) ? reg[0].id : undefined,
        };

        reg[0].order = ord.id;

        await oasp4fn.insert('Order', ord).promise();

        try {
            if (order.booking.bookingToken.startsWith('CB')) {
                await oasp4fn.insert('Booking', reg[0]).promise();
            } else {
                await oasp4fn.insert('InvitedGuest', reg[0]).promise();
            }
        } catch (err) {
            // undo the previous insert
            console.error(err);
            callback(err);
            undoChanges('delete', ord.id);
            return;
        }

        callback(null, {
            id: ord.id,
            bookingId: ord.idBooking,
            invitedGuestId: ord.idInvitedGuest,
            bookingToken: order.booking.bookingToken,
        });

        try {
            const [vat, names] = await calculateVATandOrderName(order.orderLines);

            if (serverConfig.mailConfig === serverConfig.MailType.api || serverConfig.mailConfig === serverConfig.MailType.both) {
                const config: types.EmailContent = {
                    emailFrom: 'MyThaiStar',
                    emailType: 3,
                    emailAndTokenTo: {},
                    buttonActionList: {},
                    detailMenu: names,
                    price: vat,
                };

                (config.emailAndTokenTo as { [index: string]: string })[order.booking.bookingToken] = reg[0].email;
                (config.buttonActionList as { [index: string]: string })[serverConfig.frontendURL + '/booking/cancelOrder/' + ord.id] = 'Cancel';
                Mailer.sendEmail(config);
            } else if (serverConfig.mailConfig === serverConfig.MailType.mock || serverConfig.mailConfig === serverConfig.MailType.both) {
                console.log(`Order created:
  Owner: ${reg[0].email}
  Detail menu: ${names}
  Price: ${vat}
  Cancel button: ${serverConfig.frontendURL + '/booking/cancelOrder/' + ord.id}`);
            }
        } catch (error) {
            console.error(error);
            return;
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }
}

export async function cancelOrder(orderId: string, callback: (err: types.Error | null) => void) {
    let order: dbtypes.Order;
    let booking: dbtypes.Booking;
    let invitedGuest: dbtypes.InvitedGuest | undefined;

    try {
        order = await oasp4fn.table('Order', orderId).promise() as dbtypes.Order;

        // errors
        if (!order) {
            throw { code: 400, message: 'You dont have any order to cancel' };
        }

        if (order.idInvitedGuest === undefined) {
            booking = await oasp4fn.table('Booking', order.idBooking).promise() as dbtypes.Booking;
            invitedGuest = undefined;
        } else {
            [booking, invitedGuest] = await Promise.all([oasp4fn.table('Booking', order.idBooking).promise() as Promise<dbtypes.Booking>, oasp4fn.table('InvitedGuest', order.idInvitedGuest).promise() as Promise<dbtypes.InvitedGuest>]);
        }

        const bookingDate = moment(booking.bookingDate);
        if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
            throw { code: 400, message: 'You can not cancel the order at this time' };
        }

        await oasp4fn.delete('Order', order.id).promise();

        try {
            if (invitedGuest === undefined) {
                booking.order = undefined;
                await oasp4fn.insert('Booking', booking).promise();
            } else {
                invitedGuest.order = undefined;
                await oasp4fn.insert('InvitedGuest', invitedGuest).promise();
            }
        } catch (err) {
            console.error(err);
            callback(err);
            undoChanges('insert', 'Order', order);
            return;
        }

        callback(null);

        try {
            if (serverConfig.mailConfig === serverConfig.MailType.api || serverConfig.mailConfig === serverConfig.MailType.both) {
                //TODO: send email
                // if (order.startsWith('CB')) {
                //     mailer.sendEmail(reg[0].email, '[MyThaiStar] Order canceled', undefined, pug.renderFile('./src/emails/order.pug', {
                //         title: 'Order canceled',
                //         name: reg[0].name,
                //     }));
                // } else {
                //     mailer.sendEmail(reg[0].email, '[MyThaiStar] Order canceled', undefined, pug.renderFile('./src/emails/order.pug', {
                //         title: 'Order canceled',
                //         name: reg[0].email,
                //     }));
                // }
            } else if (serverConfig.mailConfig === serverConfig.MailType.api || serverConfig.mailConfig === serverConfig.MailType.both) {
                console.log(`Order ${orderId} successfully canceled`);
            }
        } catch (err) {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }
}

export async function getOrders(pagination: types.Paginated, callback: (err: types.Error | null, page: types.PaginatedList) => void, sort?: types.SortByView[]) {

    const or = await getAllOrders(sort);

    callback(null, util.getPagination(pagination.size, pagination.page, or));
}

export async function getOrdersFiltered(search: types.SearchCriteria, callback: (err: types.Error | null, page: types.PaginatedList) => void) {

    const or = await getAllOrders(search.sort);

    callback(null, util.getPagination(search.pagination.size, search.pagination.page, _.filter(or, (elem: types.OrderView) => {
        return (search.bookingToken === undefined || search.bookingToken === '' || search.bookingToken === elem.booking.bookingToken) &&
            (search.email === undefined || search.email === '' || search.email === elem.booking.email || (elem.invitedGuest !== undefined && search.email === elem.invitedGuest.email));
    })));
}

export async function getAllOrders(sort?: types.SortByView[]): Promise<types.OrderView[]> {
    try {
        let order: any = oasp4fn.table('Order');

        const [orders, booking, invitedGuest, dishes, extras]: [any, any, any, any, any] = await Promise.all([order.promise(),
        oasp4fn.table('Booking').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise(),
        oasp4fn.table('InvitedGuest').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise(),
        oasp4fn.table('Dish').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise(),
        oasp4fn.table('Ingredient').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise()]);

        order = orders.map((elem: dbtypes.Order): types.OrderView => {
            const result: any = {
                order: {
                    id: Number(elem.id),
                    bookingId: Number(elem.idBooking),
                    invitedGuestId: Number(elem.idInvitedGuest),
                    bookingToken: booking[elem.idBooking].bookingToken,
                },
                booking: {
                    id: Number(elem.idBooking),
                    name: booking[elem.idBooking].name,
                    bookingToken: booking[elem.idBooking].bookingToken,
                    comment: booking[elem.idBooking].comment,
                    bookingDate: booking[elem.idBooking].bookingDate,
                    expirationDate: booking[elem.idBooking].expirationDate,
                    creationDate: booking[elem.idBooking].creationDate,
                    email: booking[elem.idBooking].email,
                    canceled: booking[elem.idBooking].canceled,
                    bookingType: booking[elem.idBooking].bookingType,
                    tableId: booking[elem.idBooking].table,
                    orderId: elem.id,
                    assistants: booking[elem.idBooking].assistants,
                },
                orderLines: elem.lines.map((elem2: dbtypes.OrderLine) => {
                    return {
                        orderLine: {
                            dishId: elem2.idDish,
                            amount: elem2.amount,
                            comment: elem2.comment,
                            orderId: elem.id,
                        },
                        dish: {
                            id: Number(elem2.idDish),
                            name: dishes[elem2.idDish].name,
                            description: dishes[elem2.idDish].description,
                            price: dishes[elem2.idDish].price,
                        },
                        extras: elem2.extras.map((elem3: string) => {
                            return {
                                id: Number(elem3),
                                name: extras[elem3].name,
                                description: extras[elem3].description,
                                price: extras[elem3].price,
                            };
                        }),
                    };
                }),
            };

            return result;
        });

        if (sort) {
            order = _.orderBy(order, sort.map((elem) => `booking.${elem.name}`), sort.map((elem) => elem.direction.toLowerCase()));
        }

        return order.filter((elem: any) => moment(elem.booking.bookingDate).diff(moment()) > 0);
    } catch (err) {
        return [];
    }
}

//! //////////// AUX FUNCTIONS //////////////////////////////////////////////////////////////////

export async function getFreeTable(date: string, assistants: number, previousTable?: string) {
    let pTable: dbtypes.Table | undefined;
    const [tables, booking] = await Promise.all([oasp4fn.table('Table').orderBy('seatsNumber', 'asc').promise() as Promise<dbtypes.Table[]>,
    oasp4fn.table('Booking').filter((elem: dbtypes.Booking) => {
        const bookDate = moment(elem.bookingDate);
        const date2 = moment(elem.bookingDate);
        date2.add(1, 'hour');

        return !elem.canceled && moment(date).isBetween(bookDate, date2, undefined, '[)');
    }).map((elem: dbtypes.Booking) => elem.table || '-1').promise() as Promise<string[]>]);

    if (previousTable !== undefined) {
        pTable = _.find(tables, (t) => t.id === previousTable)!;
    }

    const table = tables.filter((elem: dbtypes.Table) => {
        return !_.includes(booking, elem.id) && elem.seatsNumber >= assistants;
    });

    if (table.length > 0) {
        if (pTable !== undefined && pTable.seatsNumber <= table[0].seatsNumber) return previousTable!;
        return table[0].id;
    }

    return 'error';
}

function dishToDishesview() {
    return (element: any): types.DishesView => {
        return {
            dish: {
                id: Number(element.id),
                name: element.name,
                description: element.description,
                price: element.price,
                imageId: 0,
            },
            image: element.image,
            extras: element.extras.map((elem: dbtypes.Ingredient): types.ExtraIngredientView => {
                return {
                    id: Number(elem.id),
                    description: elem.description,
                    price: elem.price,
                    name: elem.name,
                };
            }),
        };
    };
}

async function calculateVATandOrderName(orderLines: types.OrderLinesView[]): Promise<[number, string[]]> {
    let sum: number = 0;
    const names: string[] = [];

    const [dishes, extras] = await Promise.all([
        oasp4fn.table('Dish', orderLines.map((elem: types.OrderLinesView) => {
            return elem.orderLine.dishId.toString();
        })).
            reduce((acum: any, elem: any) => {
                acum[elem.id] = elem;
                return acum;
            }, {}).
            promise() as Promise<any>,
        oasp4fn.table('Ingredient').
            reduce((acum: any, elem: any) => {
                acum[elem.id] = elem;
                return acum;
            }, {}).
            promise() as Promise<any>,
    ]);

    orderLines.forEach((elem: types.OrderLinesView) => {
        let x = dishes[elem.orderLine.dishId.toString()].price;
        let name = elem.orderLine.amount + 'x ' + dishes[elem.orderLine.dishId.toString()].name + ' with ';
        elem.extras.forEach((elem2: types.ExtraIngredientView) => {
            x += extras[elem2.id.toString()].price;
            name += extras[elem2.id.toString()].name + ', ';
        });

        sum += x * elem.orderLine.amount;
        name = name.substring(0, name.length - 2);
        name += ' (' + x + '€)';

        names.push(name);
    });

    return [sum, names];
}

/**
 * Check all params of FilterView and put the correct values if neccesary
 *
 * @param {types.IFilterView} filter
 * @returns
 */
export function checkFilter(filter: any) {
    filter.maxPrice = (filter.maxPrice === undefined || filter.maxPrice === null || filter.maxPrice === '') ? maxPrice : filter.maxPrice;
    filter.minLikes = (filter.minLikes === undefined || filter.minLikes === null || filter.minLikes === '') ? 0 : filter.minLikes;
    filter.searchBy = (filter.searchBy === undefined || filter.searchBy === null) ? '' : filter.searchBy;
    filter.isFab = (filter.isFab === undefined || filter.isFab === null) ? false : filter.isFab;
    filter.sort = (filter.sort === undefined || filter.sort === null || filter.sort.length === 0 || filter.sort[0].name === null) ? [] : filter.sort;
    filter.showOrder = (filter.showOrder === undefined || filter.showOrder === null) ? 0 : filter.showOrder;
    // filter.pagination = filter.pagination || {size: 10, page: 1, total: 1 };
}

export async function undoChanges(operation: 'insert' | 'delete', table: string, object?: any) {
    let error = true;

    // retry 5 times
    for (let i = 0; error && i < 5; i++) {
        try {
            if (operation === 'insert') {
                if (object !== undefined) {
                    await oasp4fn.insert(table, object).promise();
                }
            } else if (operation === 'delete') {
                if (object !== undefined) {
                    await oasp4fn.delete(table, object).promise();
                }
            }

            error = false;
        } catch (error) {
            console.error(error);
        }
    }

    if (error) {
        console.error('SEVERAL ERROR: DATABASE MAY HAVE INCONSISTENT DATA!');
    }
}

export async function cleanDatabase() {
    await Promise.all(
        [
            oasp4fn.table('Booking').project('id').delete().promise(),
            oasp4fn.table('InvitedGuest').project('id').delete().promise(),
            oasp4fn.table('Order').project('id').delete().promise(),
        ]);
}
