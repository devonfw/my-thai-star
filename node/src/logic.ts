import { TableCron } from './utils/tableManagement';
import { NumberAttributeValue } from 'aws-sdk/clients/dynamodbstreams';
import { Credentials } from 'aws-sdk';
import { ActionConfigurationPropertyList } from 'aws-sdk/clients/codepipeline';
import { AccessControlPolicy } from 'aws-sdk/clients/s3';
import * as _ from 'lodash';
import dynamo from 'oasp4fn/out/adapters/fn-dynamo';
import fn from 'oasp4fn';
import * as dbtypes from './model/database';
import * as types from './model/interfaces';
import * as util from './utils/utilFunctions';
import * as moment from 'moment';
import * as md5 from 'md5';
import { Mailer } from './utils/mailer';
import * as pug from 'pug';

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
const dateFormat = 'YYYY-MM-DD HH:mm:ss.SSS';
const bookingExpiration: number = 1;
const bookingExpirationH = 'hour';
const mailer = new Mailer('Gmail', 'mythaistarrestaurant@gmail.com', 'mythaistarrestaurant2501');

export async function getDishes(filter: types.IFilterView,
                                callback: (err: types.IError | null, dishes?: types.IPaginatedList) => void) {
    // check filter values. Put the correct if neccessary
    checkFilter(filter);

    try {
        // filter by category
        const catId: string[] | undefined = (filter.categories === null || filter.categories === undefined || filter.categories.length === 0) ?
            undefined :
            filter.categories.map((elem: types.ICategoryView) => elem.id.toString());

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
            const fav: dbtypes.IUser = await fn.table('User', '1').
                promise() as dbtypes.IUser;

            const s2: Set<string> = new Set(fav.favourites as string[]);

            dishIdSet = (dishIdSet !== undefined) ? util.setIntersection(dishIdSet, s2) : s2;
        }

        // get dishes from database
        if (dishIdSet === undefined || dishIdSet.size > 0) {
            const ingredients: dbtypes.IIngredient[] = await fn.table('Ingredient').promise() as dbtypes.IIngredient[];

            let dishes: types.IDishView[] = await fn.
                table('Dish', (dishIdSet !== undefined) ? [...dishIdSet] : undefined).
                map(util.relationArrayOfIds(ingredients, 'extras', 'id')).
                map(dishToDishview()).
                where('price', filter.maxPrice, '<=').
                filter((o: any) => {
                    return _.lowerCase(o.name).includes(_.lowerCase(filter.searchBy))
                        || _.lowerCase(o.description).includes(_.lowerCase(filter.searchBy));
                }).
                // orderBy(filter.sortBy[0].name, _.lowerCase(filter.sortBy[0].direction)).
                promise() as types.IDishView[];

            if (filter.sortBy !== undefined && filter.sortBy.length > 0) {
                dishes = _.orderBy(dishes, filter.sortBy.map((elem: types.ISortByView) => elem.name), filter.sortBy.map((elem: types.ISortByView) => _.lowerCase(elem.direction)));
            }

            // TODO: filter by likes
            callback(null, util.getPagination(filter.pagination.size, filter.pagination.page, dishes));
        } else {
            callback(null, util.getPagination(filter.pagination.size, filter.pagination.page, []));
        }

    } catch (error) {
        console.error(error);
        callback({ code: 500, message: error.message });
    }
}

export async function createBooking(reserv: types.IBookingView, cron: TableCron,
                                    callback: (err: types.IError | null, booToken?: string) => void) {
    const date = moment();
    const bookDate = moment(reserv.date, dateFormat);

    try {
        let table;
        if (reserv.type.index === types.BookingTypes.booking) {
            table = await getFreeTable(reserv.date, reserv.assistants as number);

            if (table === 'error') {
                callback({ code: 400, message: 'No more tables' });
                return;
            }
        }

        const booking: dbtypes.IBooking = {
            id: util.getNanoTime().toString(),
            // TODO: get user from session or check if is a guest
            // userId: '1',
            name: reserv.name,
            email: reserv.email,
            bookingToken: 'CB_' + moment().format('YYYYMMDD') + '_' + md5(reserv.email + moment().format('YYYYMMDDHHmmss')),
            bookingDate: reserv.date,
            expirationDate: bookDate.subtract(1, 'hour').format(dateFormat), // TODO: modify this, maybe add 1 hour or delete this property
            creationDate: date.format(dateFormat),
            canceled: false,
            bookingType: reserv.type.index,
            assistants: (reserv.type.index === types.BookingTypes.booking) ? reserv.assistants : undefined,
            table: (reserv.type.index === types.BookingTypes.booking) ? table : undefined,
        };

        const inv: dbtypes.IInvitedGuest[] = [];

        if (reserv.type.index === types.BookingTypes.invited && (reserv.guestList as string[]).length > 0) {
            // remove possible duplicates
            const emails: Set<string> = new Set(reserv.guestList);

            emails.forEach((elem: string) => {
                const now = moment();
                inv.push({
                    id: util.getNanoTime().toString(),
                    idBooking: booking.id,
                    guestToken: 'GB_' + now.format('YYYYMMDD') + '_' + md5(elem + now.format('YYYYMMDDHHmmss')),
                    email: elem,
                    modificationDate: now.format(dateFormat),
                    order: undefined,
                });
            });

            booking.guestList = inv.map((elem: any): string => elem.id);
        }

        // wait for the insertion and check if there are a exception
        // TODO: tratar los errores
        await fn.insert('Booking', booking).promise();
        if (reserv.type.index === types.BookingTypes.invited && inv.length > 0) {
            await fn.insert('InvitedGuest', inv).promise();
            cron.startJob(booking.id, booking.bookingDate);
        }

        callback(null, booking.bookingToken);

        if (reserv.type.index === types.BookingTypes.booking) {
            mailer.sendEmail(reserv.email, '[MyThaiStar] Booking info', undefined, pug.renderFile('./src/emails/createBooking.pug', {
                title: 'Booking created',
                name: reserv.name,
                date: bookDate.format('YYYY-MM-DD'),
                hour: bookDate.format('HH:mm:ss'),
                assistants: reserv.assistants,
            }));
        } else {
            mailer.sendEmail(reserv.email, '[MyThaiStar] Booking info', undefined, pug.renderFile('./src/emails/createInvitationHost.pug', {
                title: 'Invitation created',
                name: reserv.name,
                date: bookDate.format('YYYY-MM-DD'),
                hour: bookDate.format('HH:mm:ss'),
                guest: reserv.guestList,
                urlCancel: '#',
            }));

            (reserv.guestList as string[]).forEach((elem: string) => {
                const email = pug.renderFile('./src/emails/createInvitationGuest.pug', {
                    title: 'You have been invited',
                    email: elem,
                    name: reserv.name,
                    hostEmail: reserv.email,
                    date: bookDate.format('YYYY-MM-DD'),
                    hour: bookDate.format('HH:mm:ss'),
                    guest: reserv.guestList,
                    urlAcept: '#',
                    urlCancel: '#',
                });

                mailer.sendEmail(elem, '[MyThaiStar] Your have a new invitation', email, email);
            });
        }
    } catch (err) {
        console.log(err);
        callback(err);
    }
}

export async function updateBookingWithTable(id: string, table: string) {
    try {
        const book = await fn.table('Booking', id).promise() as dbtypes.IBooking;

        book.table = table;

        await fn.insert('Booking', book).promise();
        return false;
    }catch (error) {
        return true;
    }
}

export async function getBookingById(id: string, callback: (err: types.IError | null, booking?: types.IBookingView) => void) {
    let reg: dbtypes.IBooking;

    try {
        reg = await fn.table('Booking', id).promise() as dbtypes.IBooking;
    } catch (err) {
        callback(err);
        return;
    }

    const bookingView: types.IBookingView = {
        date: reg.bookingDate,
        type: { index: reg.bookingType },
        name: reg.name,
        email: reg.email,
        assistants: reg.assistants,
        guestList: reg.guestList,
    };

    callback(null, bookingView);
}

export function getAllInvitedBookings(): Promise<dbtypes.IBooking[]> {
    return fn.table('Booking').filter((o: dbtypes.IBooking) => {
                    return o.bookingType === types.BookingTypes.invited &&
                        moment(o.bookingDate, dateFormat).isAfter(moment().add(1, 'hour'));
                }).promise() as Promise<dbtypes.IBooking[]>;
}

export async function getAssistansForInvitedBooking(id: string){
    const book = await fn.table('InvitedGuest').where('idBooking', id, '=').
        filter((elem: dbtypes.IInvitedGuest) => elem.acepted).promise() as dbtypes.IInvitedGuest[];

    return book.length + 1;
}

export async function createOrder(order: types.IOrderView, callback: (err: types.IError | null) => void) {

    // check if exsist the token
    let reg: any[];

    try {
        if (order.bookingId.startsWith('CB')) {
            reg = await fn.table('Booking').where('bookingToken', order.bookingId, '=').promise() as dbtypes.IBooking[];
        } else {
            reg = await fn.table('InvitedGuest').where('guestToken', order.bookingId, '=').promise() as dbtypes.IInvitedGuest[];
        }

        console.log(reg);

        // Possible errors
        // Not found
        if (reg.length === 0) {
            callback({ code: 400, message: 'No Invitation token given' });
            return;
        }

        // booking canceled
        if (order.bookingId.startsWith('CB')) {
            if (reg[0].canceled !== undefined && reg[0].canceled === true) {
                callback({ code: 400, message: 'The booking is canceled' });
                return;
            }
            const bookingDate = moment(reg[0].bookingDate, dateFormat);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                callback({ code: 400, message: 'You can not create the order at this time' });
                return;
            }
        } else {
            if (reg[0].acepted !== true) {
                callback({ code: 400, message: 'You must confirm' });
                return;
            }
            const reg2 = await fn.table('Booking', reg[0].idBooking).promise() as dbtypes.IBooking;
            console.log(reg2);
            if (reg2.canceled !== undefined && reg2.canceled === true) {
                callback({ code: 400, message: 'The booking is canceled' });
                return;
            }
            const bookingDate = moment(reg2.bookingDate, dateFormat);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                callback({ code: 400, message: 'You can not create the at this time' });
                return;
            }
        }
        // Order already registered
        if (reg[0].order !== undefined) {
            callback({ code: 400, message: 'You have a order, cant create a new one' });
            return;
        }
    } catch (err) {
        console.error(err);
        callback({ code: 500, message: 'Database error' });
        return;
    }

    const ord: dbtypes.IOrder = {
        id: util.getNanoTime().toString(),
        lines: (order.lines.length > 0) ? order.lines.map((elem: types.IOrderLineView): dbtypes.IOrderLine => {
            return {
                idDish: elem.idDish.toString(),
                extras: (elem.extras.length > 0) ? elem.extras.map((elem2: number) => elem2.toString()) : [],
                amount: elem.amount,
                comment: (elem.comment === '') ? undefined : elem.comment,
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
        callback({ code: 500, message: 'Database error' });
        return;
    }

    try {
        if (order.bookingId.startsWith('CB')) {
            await fn.insert('Booking', reg[0]).promise();
        } else {
            await fn.insert('InvitedGuest', reg[0]).promise();
        }
    } catch (err) {
        console.error(err);
        callback({ code: 500, message: 'Database error' });
        // undo the previous insert
        fn.delete('Order', ord.id).promise();
        return;
    }

    callback(null);

    const [vat, names] = await calculateVATandOrderName(order);
    mailer.sendEmail(reg[0].email, '[MyThaiStar] Order info', undefined, pug.renderFile('./src/emails/order.pug', {
        title: 'Order created',
        email: reg[0].email,
        total: vat,
        urlCancel: '#',
        order: names,
    }));
}
export async function cancelOrder(order: string, callback: (err: types.IError | null) => void) {
    let reg: any[];
    try {
        if (order.startsWith('CB')) {
            reg = await fn.table('Booking').where('bookingToken', order, '=').promise() as any[];
        } else {
            reg = await fn.table('InvitedGuest').where('guestToken', order, '=').promise() as any[];
        }

        // errors
        if (reg.length === 0) {
            callback({ code: 400, message: 'Invalid Invitation token given' });
            return;
        }

        if (reg[0].order === undefined) {
            callback({ code: 400, message: 'You dont have any order to cancel' });
        }

        if (order.startsWith('CB')) {
            const bookingDate = moment(reg[0].bookingDate, dateFormat);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                callback({ code: 400, message: 'You can not cancel the order at this time' });
                return;
            }
        } else {
            const reg2 = await fn.table('Booking', reg[0].idBooking).promise() as dbtypes.IBooking;
            const bookingDate = moment(reg2.bookingDate, dateFormat);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                callback({ code: 400, message: 'You can not create the order at this time' });
                return;
            }
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    const oldOrder = reg[0].order;
    reg[0].order = undefined;

    try {
        if (order.startsWith('CB')) {
            await fn.insert('Booking', reg[0]).promise();
        } else {
            await fn.insert('InvitedGuest', reg[0]).promise();
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    try {
        await fn.delete('Order', oldOrder).promise();
    } catch (err) {
        console.error(err);
        callback(err);
        reg[0].order = oldOrder;
        if (order.startsWith('CB')) {
            await fn.insert('Booking', reg[0]).promise();
        } else {
            await fn.insert('InvitedGuest', reg[0]).promise();
        }
        return;
    }

    callback(null);

    if (order.startsWith('CB')) {
        mailer.sendEmail(reg[0].email, '[MyThaiStar] Order canceled', undefined, pug.renderFile('./src/emails/order.pug', {
            title: 'Order canceled',
            name: reg[0].name,
        }));
    } else {
        mailer.sendEmail(reg[0].email, '[MyThaiStar] Order canceled', undefined, pug.renderFile('./src/emails/order.pug', {
            title: 'Order canceled',
            name: reg[0].email,
        }));
    }
}
export async function cancelInvitation(token: string, callback: (err: types.IError | null) => void) {
    let reg: dbtypes.IBooking[];
    try {
        reg = await fn.table('Booking').where('bookingToken', token, '=').promise() as dbtypes.IBooking[];

        // errors
        if (reg.length === 0) {
            callback({ code: 400, message: 'Invalid token given' });
            return;
        }

        if (reg[0].bookingType !== types.BookingTypes.invited) {
            callback({ code: 400, message: 'You can\'t cancel the booking' });
            return;
        }

        const bookingDate = moment(reg[0].bookingDate, dateFormat);
        if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
            callback({ code: 400, message: 'You can\'t cancel the booking at this time' });
            return;
        }

        if (reg[0].canceled) {
            callback({ code: 400, message: 'Already canceled' });
            return;
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    reg[0].canceled = true;

    try {
        await fn.insert('Booking', reg[0]).promise();
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    reg[0].canceled = false;
    let guest;

    try {
        if (reg[0].guestList !== undefined && (reg[0].guestList as string[]).length > 0) {
            guest = await fn.delete('InvitedGuest', (reg[0].guestList as string[])).promise() as dbtypes.IInvitedGuest[];
        }
    } catch (err) {
        console.error(err);
        callback(err);
        await fn.insert('Booking', reg[0]).promise();
        return;
    }

    try {
        const order = await fn.table('Order').where('idBooking', reg[0].id, '=').promise() as dbtypes.IOrder[];

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

    // const reservation = await fn.table('Booking').promise();
    // const invited = await fn.table('InvitedGuest').promise();
    // const order = await fn.table('Order').promise();

    // console.log('\n\n\n');
    // console.log(reservation);
    // console.log('\n\n\n');
    // console.log(invited);
    // console.log('\n\n\n');
    // console.log(order);
    // TODO: send emails

    mailer.sendEmail(reg[0].email, '[MyThaiStar] Invitation canceled', undefined, pug.renderFile('./src/emails/order.pug', {
        title: 'Invitation canceled',
        name: reg[0].name,
    }));

    if (guest !== undefined) {
        guest.forEach((elem: any) => {
            mailer.sendEmail(elem.email, '[MyThaiStar] Invitation canceled', undefined, pug.renderFile('./src/emails/order.pug', {
                title: 'Invitation canceled',
                name: elem.email,
            }));
        });
    }
}

export async function updateInvitation(token: string, response: boolean, callback: (err: types.IError | null) => void) {
    let reg: dbtypes.IInvitedGuest[];
    try {
        reg = await fn.table('InvitedGuest').where('guestToken', token, '=').promise() as dbtypes.IInvitedGuest[];

        // errors
        if (reg.length === 0) {
            callback({ code: 400, message: 'Invalid token given' });
            return;
        }

        if (reg[0].acepted !== undefined && reg[0].acepted === false) {
            callback({ code: 400, message: 'The invitation is canceled, you can\'t do any modification' });
            return;
        }

        const booking = await fn.table('Booking', reg[0].idBooking).promise() as dbtypes.IBooking;
        if (moment(booking.bookingDate, dateFormat).diff(moment().add(10, 'minutes')) < 0) {
            callback({ code: 500, message: 'You can\'t do this operation at this moment' });
            return;
        }
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    const { acepted: oldAcepted, modificationDate: oldModificationDate } = reg[0];

    try {
        reg[0].acepted = response;
        reg[0].modificationDate = moment().format(dateFormat);

        await fn.insert('InvitedGuest', reg[0]).promise();
    } catch (err) {
        console.error(err);
        callback(err);
        return;
    }

    try {
        const orders = await fn.table('Order').where('idInvitedGuest', reg[0].id).promise() as dbtypes.IOrder[];

        if (orders.length > 0) {
            await fn.delete('Order', orders.map((elem: any) => elem.id)).promise();
        }
    } catch (err) {
        console.error(err);
        callback(err);
        reg[0].acepted = oldAcepted;
        reg[0].modificationDate = oldModificationDate;
        fn.insert('InvitedGuest', reg[0]).promise();
        return;
    }

    callback(null);
}

export async function getFreeTable(date: string, assistants: number) {
    let [tables, booking] = await Promise.all([fn.table('Table').orderBy('seatsNumber', 'asc').promise() as Promise<dbtypes.ITable[]>,
    fn.table('Booking').filter((elem: dbtypes.IBooking) => {
        const bookDate = moment(elem.bookingDate, dateFormat);
        const date2 = moment(elem.bookingDate, dateFormat);
        date2.add(1, 'hour');

        return moment(date, dateFormat).isBetween(bookDate, date2, undefined, '[)');
    }).map((elem: dbtypes.IBooking) => elem.table || '-1').promise() as Promise<string[]>]);

    tables = tables.filter((elem: dbtypes.ITable) => {
        return !_.includes(booking, elem.id) && elem.seatsNumber >= assistants;
    });

    if (tables.length > 0) {
        return tables[0].id;
    }

    return 'error';
}

function dishToDishview() {
    return (element: any) => {
        element.id = Number(element.id);
        // TODO: get fav & likes
        element.favourite = {
            isFav: false,
            likes: 20,
        };

        element.extras.forEach((element2: any) => {
            delete (element2.description);
            element2.selected = false;
            return element2;
        });

        return element;
    };
}

async function calculateVATandOrderName(order: types.IOrderView): Promise<[number, string[]]> {
    let sum: number = 0;
    const names: string[] = [];

    const [dishes, extras] = await Promise.all([
        fn.table('Dish', order.lines.map((elem: types.IOrderLineView) => {
            return elem.idDish.toString();
        })).
            reduce((acum: any, elem: any) => {
                acum[elem.id] = elem;
                return acum;
            }, {}).
            promise() as Promise<any>,
        fn.table('Ingredient').
            reduce((acum: any, elem: any) => {
                acum[elem.id] = elem;
                return acum;
            }, {}).
            promise() as Promise<any>,
    ]);

    order.lines.forEach((elem: types.IOrderLineView) => {
        let x = dishes[elem.idDish.toString()].price;
        let name = '<span style="color: #317d35">' + elem.amount + '</span> ' + dishes[elem.idDish.toString()].name + ' with ';
        elem.extras.forEach((elem2: number) => {
            x += extras[elem2.toString()].price;
            name += extras[elem2.toString()].name + ', ';
        });

        sum += x * elem.amount;
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
function checkFilter(filter: types.IFilterView) {
    filter.maxPrice = filter.maxPrice || maxPrice;
    filter.minLikes = filter.minLikes || 0;
    filter.searchBy = filter.searchBy || '';
    filter.isFab = filter.isFab || false;
    filter.categories = filter.categories || [];
}