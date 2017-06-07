import { TableCron } from './utils/tableManagement';
import { NumberAttributeValue } from 'aws-sdk/clients/dynamodbstreams';
import { Credentials } from 'aws-sdk';
import { ActionConfigurationPropertyList } from 'aws-sdk/clients/codepipeline';
import { AccessControlPolicy } from 'aws-sdk/clients/s3';
import * as _ from 'lodash';
import dynamo from 'oasp4fn/dist/adapters/fn-dynamo';
import fn from 'oasp4fn';
import * as dbtypes from './model/database';
import * as types from './model/interfaces';
import * as util from './utils/utilFunctions';
import * as moment from 'moment';
import * as md5 from 'md5';
import { Mailer } from './utils/mailer';
import * as config from './config';

// Dynamo
/*
const creds = new Credentials('akid', 'secret', 'session');
fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });*/
let creds;
if (!process.env.MODE || process.env.MODE.trim() !== 'test') {
    creds = new Credentials('akid', 'secret', 'session');
    fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
} else {
    creds = new Credentials('akid2', 'secret2', 'session2');
    fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
}

const maxPrice = 50;
// export const dateFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

export function findUser(userName: string): Promise<dbtypes.User[]> {
    return fn.table('User').where('name', userName, '=').first().promise();
}

///////////////////// Dishes /////////////////////////////////////////////////////////////////////////////////////////
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
            dishCategories = await fn.table('Category', catId).
                table('DishCategory').
                join('id', 'idCategory').
                map((elem: any) => elem.idDish).
                promise() as string[];

            dishIdSet = new Set(dishCategories);

        }

        // filter by fav, TODO: check if user is correct
        if (filter.isFab) {
            // TODO: take id using the authorization token
            const fav: dbtypes.User = await fn.table('User', '1').
                promise() as dbtypes.User;

            const s2: Set<string> = new Set(fav.favourites as string[]);

            dishIdSet = (dishIdSet !== undefined) ? util.setIntersection(dishIdSet, s2) : s2;
        }

        // get dishes from database
        if (dishIdSet === undefined || dishIdSet.size > 0) {
            const ingredients: dbtypes.Ingredient[] = await fn.table('Ingredient').promise() as dbtypes.Ingredient[];

            let dishes: types.DishesView[] = await fn.
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

            // TODO: filter by likes
            callback(null, util.getPagination(500, 1, dishes));
        } else {
            callback(null, util.getPagination(0, 1, []));
        }

    } catch (error) {
        console.error(error);
        callback({ code: 500, message: error.message });
    }
}

///////////////////// BOOKING /////////////////////////////////////////////////////////////////////////////////////////

export async function createBooking(reserv: types.BookingPostView, cron: TableCron,
    callback: (error: types.Error | null, booToken?: string) => void) {
    const date = moment();
    const bookDate = moment(reserv.booking.bookingDate);

    let table;
    try {
        if (reserv.booking.bookingType === types.BookingTypes.booking) {
            table = await getFreeTable(reserv.booking.bookingDate as string, reserv.booking.assistants as number);

            if (table === 'error') {
                console.log('error tete');
                throw { code: 400, message: 'No more tables' };
            }
        }

        const booking: dbtypes.Booking = {
            id: util.getNanoTime().toString(),
            // TODO: get user from session or check if is a guest
            // userId: '1',
            name: reserv.booking.name as string,
            email: reserv.booking.email as string,
            bookingToken: 'CB_' + moment().format('YYYYMMDD') + '_' + md5(reserv.booking.email + moment().format('YYYYMMDDHHmmss')),
            bookingDate: reserv.booking.bookingDate as string,
            expirationDate: bookDate.subtract(1, 'hour').toJSON(),
            creationDate: date.toJSON(),
            canceled: false,
            bookingType: reserv.booking.bookingType as number,
            assistants: (reserv.booking.bookingType === types.BookingTypes.booking) ? reserv.booking.assistants : undefined,
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

        await fn.insert('Booking', booking).promise();

        if (reserv.booking.bookingType === types.BookingTypes.invited && inv.length > 0) {
            try {
                await fn.insert('InvitedGuest', inv).promise();
            } catch (error) {
                // TODO: undo changes
                throw { code: 500, message: error.message };
            }

            cron.startJob(booking.id, booking.bookingDate);
        }


        // console.log('holatete');
        // console.log(booking.bookingToken);
        callback(null, booking.bookingToken);

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

            (configHost.buttonActionList as { [index: string]: string })[config.frontendURL + '/booking/cancel/' + booking.bookingToken] = 'Cancel';
            (configHost.host as { [index: string]: string })[booking.email] = booking.name;
            (configHost.emailAndTokenTo as { [index: string]: string })[booking.bookingToken] = booking.email;
            inv.forEach((elem) => {
                (configHost.emailAndTokenTo as { [index: string]: string })[elem.guestToken] = elem.email;
            });

            Mailer.sendEmail(configHost);
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
    } catch (error) {
        console.error(error);
        callback(error);
    }
}

export async function updateBookingWithTable(id: string, table: string) {
    try {
        const book = await fn.table('Booking', id).promise() as dbtypes.Booking;

        book.table = table;

        await fn.insert('Booking', book).promise();
        return false;
    } catch (error) {
        return true;
    }
}

export function getAllInvitedBookings(): Promise<dbtypes.Booking[]> {
    return fn.table('Booking').filter((o: dbtypes.Booking) => {
        return o.bookingType === types.BookingTypes.invited &&
            moment(o.bookingDate).isAfter(moment().add(1, 'hour'));
    }).promise() as Promise<dbtypes.Booking[]>;
}

export async function getAssistansForInvitedBooking(id: string) {
    const book = await fn.table('InvitedGuest').where('idBooking', id, '=').
        filter((elem: dbtypes.InvitedGuest) => elem.accepted).promise() as dbtypes.InvitedGuest[];

    return book.length + 1;
}

export async function searchBooking(searchCriteria: types.SearchCriteria,
    callback: (err: types.Error | null, bookingEntity: types.PaginatedList) => void) {
    let result: any = fn.table('Booking');

    if (searchCriteria.email) {
        result = result.where('email', searchCriteria.email, '=');
    }
    if (searchCriteria.bookingToken) {
        result = result.where('bookingToken', searchCriteria.bookingToken, '=');
    }

    const [booking, invitedGuest]: [dbtypes.Booking[], { [index: string]: dbtypes.InvitedGuest }] = await Promise.all([result.filter((elem: dbtypes.Booking) => moment(elem.bookingDate).diff(moment()) > 0).promise() as dbtypes.Booking[],
    fn.table('InvitedGuest').reduce((acum: any, elem: any) => {
        acum[elem.id] = elem;
        return acum;
    }, {}).promise() as any]);

    result = booking.map((elem) => {
        return {
            booking: {
                name: elem.name,
                bookingToken: elem.bookingToken,
                email: elem.email,
                bookingDate: elem.bookingDate,
                creationDate: elem.creationDate,
                assistants: elem.assistants,
                tableId: elem.table,
            },
            invitedGuests: (elem.guestList === undefined) ? undefined : elem.guestList.map((elem2) => {
                return {
                    email: invitedGuest[elem2].email,
                    accepted: (invitedGuest[elem2].accepted) ? invitedGuest[elem2].accepted : false,
                };
            }),
        };
    });

    callback(null, util.getPagination(searchCriteria.pagination.size, searchCriteria.pagination.page, result));
}

export async function cancelBooking(token: string, tableCron: TableCron, callback: (err: types.Error | null) => void) {
    let reg: dbtypes.Booking[];
    try {
        reg = await fn.table('Booking').where('bookingToken', token, '=').promise() as dbtypes.Booking[];

        // errors ////////////////////////////////////////////////////////
        if (reg.length === 0) {
            callback({ code: 400, message: 'Invalid token given' });
            return;
        }

        if (reg[0].bookingType !== types.BookingTypes.invited) {
            callback({ code: 400, message: 'You can\'t cancel the booking' });
            return;
        }

        const bookingDate = moment(reg[0].bookingDate);
        if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
            callback({ code: 400, message: 'You can\'t cancel the booking at this time' });
            return;
        }

        if (reg[0].canceled) {
            callback({ code: 400, message: 'Already canceled' });
            return;
        }
        // end errors ////////////////////////////////////////////////////////
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    reg[0].canceled = true;

    try {
        await fn.insert('Booking', reg[0]).promise();
        tableCron.stopJob(reg[0].id);
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    reg[0].canceled = false;
    let guest;

    try {
        if (reg[0].guestList !== undefined && (reg[0].guestList as string[]).length > 0) {
            guest = await fn.delete('InvitedGuest', (reg[0].guestList as string[])).promise() as dbtypes.InvitedGuest[];
        }
    } catch (err) {
        console.error(err);
        callback(err);
        await fn.insert('Booking', reg[0]).promise();
        return;
    }

    try {
        const order = await fn.table('Order').where('idBooking', reg[0].id, '=').promise() as dbtypes.Order[];

        if (order.length > 0) {
            await fn.delete('Order', order.map((elem: any) => elem.id)).promise();
        }
    } catch (err) {
        console.error(err);
        callback(err);
        await fn.insert('Booking', reg[0]).promise();
        if (guest !== undefined) {
            await fn.insert('InvitedGuest', guest).promise();
        }
        return;
    }

    callback(null);

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
}

export async function updateInvitation(token: string, response: boolean, callback: (err: types.Error | null) => void) {
    let reg: dbtypes.InvitedGuest[];
    let booking;
    try {
        reg = await fn.table('InvitedGuest').where('guestToken', token, '=').promise() as dbtypes.InvitedGuest[];

        // errors //////////////////////////////////////////////
        if (reg.length === 0) {
            callback({ code: 400, message: 'Invalid token given' });
            return;
        }

        if (reg[0].accepted !== undefined && reg[0].accepted === false) {
            callback({ code: 400, message: 'The invitation is canceled, you can\'t do any modification' });
            return;
        }

        booking = await fn.table('Booking', reg[0].idBooking).promise() as dbtypes.Booking;
        if (moment(booking.bookingDate).diff(moment().add(10, 'minutes')) < 0) {
            callback({ code: 500, message: 'You can\'t do this operation at this moment' });
            return;
        }

        // end errors //////////////////////////////////////////////
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    const { accepted: oldAccepted, modificationDate: oldModificationDate } = reg[0];

    try {
        reg[0].accepted = response;
        reg[0].modificationDate = moment().toJSON();

        await fn.insert('InvitedGuest', reg[0]).promise();
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    try {
        const orders = await fn.table('Order').where('idInvitedGuest', reg[0].id).promise() as dbtypes.Order[];

        if (orders.length > 0) {
            await fn.delete('Order', orders.map((elem: any) => elem.id)).promise();
        }
    } catch (err) {
        console.error(err);
        callback(err);
        // TODO: extraer este comportamiento a una función aparte
        reg[0].accepted = oldAccepted;
        reg[0].modificationDate = oldModificationDate;
        fn.insert('InvitedGuest', reg[0]).promise();
        return;
    }

    callback(null);

    // TODO: send mails
}

///////////////////// ORDERS /////////////////////////////////////////////////////////////////////////////////////////

export async function createOrder(order: types.OrderPostView, callback: (err: types.Error | null) => void) {

    // check if exsist the token
    let reg: any[];

    console.log(order);

    try {
        if (order.booking.bookingToken.startsWith('CB')) {
            reg = await fn.table('Booking').where('bookingToken', order.booking.bookingToken, '=').promise() as dbtypes.Booking[];
        } else {
            reg = await fn.table('InvitedGuest').where('guestToken', order.booking.bookingToken, '=').promise() as dbtypes.InvitedGuest[];
        }

        // Possible errors
        // Not found
        if (reg.length === 0) {
            throw { code: 400, message: 'No Invitation token given' };
        }

        // booking canceled
        if (order.booking.bookingToken.startsWith('CB')) {
            if (reg[0].canceled !== undefined && reg[0].canceled === true) {
                throw { code: 400, message: 'The booking is canceled' };
            }
            const bookingDate = moment(reg[0].bookingDate);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                throw { code: 400, message: 'You can not create the order at this time' };
            }
        } else {
            if (reg[0].acepted !== true) {
                throw { code: 400, message: 'You must confirm' };
            }
            const reg2 = await fn.table('Booking', reg[0].idBooking).promise() as dbtypes.Booking;
            console.log(reg2);
            if (reg2.canceled !== undefined && reg2.canceled === true) {
                throw { code: 400, message: 'The booking is canceled' };
            }
            const bookingDate = moment(reg2.bookingDate);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                throw { code: 400, message: 'You can not create the at this time' };
            }
        }

        // Order already registered
        if (reg[0].order !== undefined) {
            throw { code: 400, message: 'You have a order, cant create a new one' };
        }


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

        try {
            await fn.insert('Order', ord).promise();
        } catch (err) {
            console.error(err);
            throw { code: 500, message: 'Database error' };
        }

        try {
            if (order.booking.bookingToken.startsWith('CB')) {
                await fn.insert('Booking', reg[0]).promise();
            } else {
                await fn.insert('InvitedGuest', reg[0]).promise();
            }
        } catch (err) {
            console.error(err);

            // undo the previous insert
            fn.delete('Order', ord.id).promise();

            throw { code: 500, message: 'Database error' };
        }

        callback(null);

        // const [vat, names] = await calculateVATandOrderName(order);
        // mailer.sendEmail(reg[0].email, '[MyThaiStar] Order info', undefined, pug.renderFile('./src/emails/order.pug', {
        //     title: 'Order created',
        //     email: reg[0].email,
        //     total: vat,
        //     urlCancel: '#',
        //     order: names,
        // }));
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

    console.log(orderId);

    try {
        order = await fn.table('Order', orderId).promise() as dbtypes.Order;

        console.log(order);
        // errors
        if (!order) {
            callback({ code: 400, message: 'You dont have any order to cancel' });
            return;
        }

        if (order.idInvitedGuest === undefined) {
            booking = await fn.table('Booking', order.idBooking).promise() as dbtypes.Booking;
            invitedGuest = undefined;
        } else {
            [booking, invitedGuest] = await Promise.all([fn.table('Booking', order.idBooking).promise() as Promise<dbtypes.Booking>, fn.table('InvitedGuest', order.idInvitedGuest).promise() as Promise<dbtypes.InvitedGuest>]);
            // booking = await fn.table('Booking', order.idBooking).promise() as dbtypes.Booking;
            // invitedGuest = await fn.table('InvitedGuest', order.idInvitedGuest).promise() as dbtypes.InvitedGuest;
        }

        const bookingDate = moment(booking.bookingDate);
        if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
            callback({ code: 400, message: 'You can not cancel the order at this time' });
            return;
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    try {
        await fn.delete('Order', order.id).promise();
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    try {
        if (invitedGuest === undefined) {
            booking.order = undefined;
            await fn.insert('Booking', booking).promise();
        } else {
            invitedGuest.order = undefined;
            await fn.insert('InvitedGuest', invitedGuest).promise();
        }
    } catch (err) {
        console.error(err);
        callback(err);
        fn.insert('Order', order).promise();
        return;
    }

    callback(null);

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
}

export async function getOrders(pagination: types.Paginated, callback: (err: types.Error | null, page: types.PaginatedList) => void) {

    const or = await getAllOrders();

    callback(null, util.getPagination(pagination.size, pagination.page, or));
}

export async function getOrdersFiltered(search: types.SearchCriteria, callback: (err: types.Error | null, page: types.PaginatedList) => void) {

    const or = await getAllOrders();

    callback(null, util.getPagination(search.pagination.size, search.pagination.page, _.filter(or, (elem: types.OrderView) => {
        return (search.bookingToken === undefined || search.bookingToken === '' || search.bookingToken === elem.booking.bookingToken) &&
            (search.email === undefined || search.email === '' || search.email === elem.booking.email || (elem.invitedGuest !== undefined && search.email === elem.invitedGuest.email));
    })));
}

export async function getAllOrders(): Promise<types.OrderView[]> {
    try {
        let order: any = fn.table('Order');

        const [orders, booking, invitedGuest, dishes, extras]: [any, any, any, any, any] = await Promise.all([order.promise(),
        fn.table('Booking').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise(),
        fn.table('InvitedGuest').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise(),
        fn.table('Dish').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise(),
        fn.table('Ingredient').reduce((acum: any, elem: any) => {
            acum[elem.id] = elem;
            return acum;
        }, {}).promise()]);

        // TODO: no enviar orders que ya pasaron en el tiempo
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

        return order.filter((elem: any) => moment(elem.booking.bookingDate).diff(moment()) > 0);
    } catch (err) {
        return [];
    }
}

////////////// AUX FUNCTIONS //////////////////////////////////////////////////////////////////

export async function getFreeTable(date: string, assistants: number) {
    let [tables, booking] = await Promise.all([fn.table('Table').orderBy('seatsNumber', 'asc').promise() as Promise<dbtypes.Table[]>,
    fn.table('Booking').filter((elem: dbtypes.Booking) => {
        const bookDate = moment(elem.bookingDate);
        const date2 = moment(elem.bookingDate);
        date2.add(1, 'hour');

        return !elem.canceled && moment(date).isBetween(bookDate, date2, undefined, '[)');
    }).map((elem: dbtypes.Booking) => elem.table || '-1').promise() as Promise<string[]>]);

    tables = tables.filter((elem: dbtypes.Table) => {
        return !_.includes(booking, elem.id) && elem.seatsNumber >= assistants;
    });

    if (tables.length > 0) {
        return tables[0].id;
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

// async function calculateVATandOrderName(order: types.IOrderView): Promise<[number, string[]]> {
//     let sum: number = 0;
//     const names: string[] = [];

//     const [dishes, extras] = await Promise.all([
//         fn.table('Dish', order.lines.map((elem: types.IOrderLineView) => {
//             return elem.idDish.toString();
//         })).
//             reduce((acum: any, elem: any) => {
//                 acum[elem.id] = elem;
//                 return acum;
//             }, {}).
//             promise() as Promise<any>,
//         fn.table('Ingredient').
//             reduce((acum: any, elem: any) => {
//                 acum[elem.id] = elem;
//                 return acum;
//             }, {}).
//             promise() as Promise<any>,
//     ]);

//     order.lines.forEach((elem: types.IOrderLineView) => {
//         let x = dishes[elem.idDish.toString()].price;
//         let name = '<span style="color: #317d35">' + elem.amount + '</span> ' + dishes[elem.idDish.toString()].name + ' with ';
//         elem.extras.forEach((elem2: number) => {
//             x += extras[elem2.toString()].price;
//             name += extras[elem2.toString()].name + ', ';
//         });

//         sum += x * elem.amount;
//         name = name.substring(0, name.length - 2);
//         name += ' (' + x + '€)';

//         names.push(name);
//     });

//     return [sum, names];
// }

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