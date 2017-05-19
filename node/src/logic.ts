import { Credentials } from 'aws-sdk';
import { ActionConfigurationPropertyList } from 'aws-sdk/clients/codepipeline';
import { AccessControlPolicy } from 'aws-sdk/clients/s3';
import * as _ from 'lodash';
import dynamo from './data-collector/src/adapters/fn-dynamo';
import fn from './data-collector/src/index';
import * as dbtypes from './model/database';
import * as types from './model/interfaces';
import * as util from './utils/utilFunctions';
import * as moment from 'moment';
import * as md5 from 'md5';

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

export default {
    /*getDihses: async (callback: (err: types.IError | null, dishes?: types.IDishView[]) => void) => {
        try {
            /* Old way to do this with other database structure
            let tables = await fn.table('Dish').
                map(util.renameProperties("Dish")).
                table('DishIngredient').
                join('DishId', 'IdDish').
                table('Ingredient').
                join('IdIngredient', 'Id').
                reduce((acum: any, elem: any) => {
                    if (acum[elem.DishName]) {
                        acum[elem.DishName].extras.push({ name: elem.Name, price: elem.Price, selected: false });
                    } else {
                        acum[elem.DishName] = {
                            favourite: false,
                            image: elem.DishImage,
                            likes: elem.DishLikes,
                            extras: [{ name: elem.Name, price: elem.Price, selected: false }],
                            orderDescription: elem.DishDescription,
                            orderName: elem.DishName,
                            price: elem.DishPrice,
                        };
                    }
                    return acum;
                }, {}).
                promise();

            let res = util.objectToArray(tables);// *//*

const ingredients: dbtypes.IIngredient[] = await fn.table('Ingredient').promise();

const dishes: types.IDishView[] = await fn.table('Dish').map(util.relationArrayOfIds(ingredients, 'extras', 'id')).
map(util.dishToDishview()).
promise();

callback(null, dishes);
} catch (err) {
callback(err);
}
},*/

    getDishes: async (filter: types.IFilterView,
                      callback: (err: types.IError | null, dishes?: types.IDishView[]) => void) => {
        // check filter values. Put the correct if neccessary
        util.checkFilter(filter);

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
                    promise();

                dishIdSet = new Set(dishCategories);

            }

            // filter by fav, TODO: check if user is correct
            if (filter.isFab) {
                // TODO: take id using the authorization token
                const fav = await fn.table('User', '1').
                    promise();

                const s2: Set<string> = new Set(fav.favorites as string[]);

                dishIdSet = (dishIdSet !== undefined) ? util.setIntersection(dishIdSet, s2) : s2;
            }

            // get dishes from database
            if (dishIdSet === undefined || dishIdSet.size > 0) {
                const ingredients: dbtypes.IIngredient[] = await fn.table('Ingredient').promise();

                const dishes: types.IDishView[] = await fn.
                    table('Dish', (dishIdSet !== undefined) ? [...dishIdSet] : undefined).
                    map(util.relationArrayOfIds(ingredients, 'extras', 'id')).
                    map(util.dishToDishview()).
                    where('price', filter.maxPrice, '<=').
                    filter((o: any) => {
                        return _.lowerCase(o.name).includes(_.lowerCase(filter.searchBy))
                            || _.lowerCase(o.description).includes(_.lowerCase(filter.searchBy));
                    }).
                    promise();

                // TODO: filter by likes
                callback(null, dishes);
            } else {
                callback(null, []);
            }

        } catch (error) {
            console.error(error);
            callback(error);
        }
    },
    createBooking: async (reserv: types.IReservationView,
                          callback: (err: types.IError | null, booToken?: string) => void) => {
        const date = moment();
        const bookDate = moment(reserv.date);

        try {
            const booking: dbtypes.IBooking = {
                id: util.getNanoTime().toString(),
                // TODO: get user from session or check if is a guest
                // userId: '1',
                name: reserv.name,
                email: reserv.email,
                bookingToken: 'CB_' + moment().format('YYYYMMDD') + '_' + md5(reserv.email + moment().format('YYYYMMDDHHmmss')),
                bookingDate: bookDate.format(dateFormat),
                expirationDate: bookDate.subtract(1, 'hour').format(dateFormat), // TODO: modify this, maybe add 1 hour or delete this property
                creationDate: date.format(dateFormat),
                canceled: false,
                bookingType: reserv.type.name,
                assistants: (reserv.type.name === 'booking') ? reserv.assistants : undefined,
                table: (reserv.type.name === 'booking') ? util.getTable() : undefined,
            };

            const inv: dbtypes.IInvitedGuest[] = [];

            if (reserv.type.name === 'invitation' && reserv.guestList.length > 0) {
                // remove possible duplicates
                const emails: Set<string> = new Set(reserv.guestList);

                emails.forEach((elem: string) => {
                    const now = moment();
                    inv.push({
                        id: util.getNanoTime().toString(),
                        idBooking: booking.id,
                        guestToken: 'GB_' + now.format('YYYYMMDD') + '_' + md5(elem + now.format('YYYYMMDDHHmmss')),
                        email: elem,
                        accepted: null,
                        modificationDate: now.format(dateFormat),
                        order: undefined,
                    });
                });

                booking.guestList = inv.map((elem: any): string => elem.id);
            }

            // wait for the insertion and check if there are a exception
            // TODO: tratar los errores
            await fn.insert('Booking', booking).promise();
            if (inv.length > 0 || false) {
                await fn.insert('InvitedGuest', inv).promise();
            }

            callback(null, booking.bookingToken);

            // TODO: send all mails
        } catch (err) {
            console.log(err);
            callback(err);
        }
    },
    createOrder: async (order: types.IOrderView, callback: (err: types.IError | null) => void) => {

        // check if exsist the token
        let reg: any[];

        try {
            if (order.invitationId.startsWith('CB')) {
                reg = await fn.table('Booking').where('bookingToken', order.invitationId, '=').promise();
            } else {
                reg = await fn.table('InvitedGuest').where('guestToken', order.invitationId, '=').promise();
            }

            // Possible errors
            // Not found
            if (reg.length === 0) {
                callback({ code: 400, message: 'No Invitation token given' });
                return;
            }
            // booking canceled
            if (order.invitationId.startsWith('CB')) {
                if (reg[0].canceled !== undefined && reg[0].canceled === true) {
                    callback({ code: 500, message: 'The booking is canceled' });
                    return;
                }
                const bookingDate = moment(reg[0].bookingDate, dateFormat);
                if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                    callback({ code: 500, message: 'You can not create the order at this time' });
                    return;
                }
            } else {
                const reg2 = await fn.table('Booking', reg[0].idBooking).promise();
                if (reg2[0].canceled !== undefined && reg2[0].canceled === true) {
                    callback({ code: 500, message: 'The booking is canceled' });
                    return;
                }
                const bookingDate = moment(reg2[0].bookingDate, dateFormat);
                if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                    callback({ code: 500, message: 'You can not create the at this time' });
                    return;
                }
            }
            // Order already registered
            if (reg[0].order !== undefined) {
                callback({ code: 500, message: 'You have a order, cant create a new one' });
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
            if (order.invitationId.startsWith('CB')) {
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
    },
    cancelOrder: async (order: string, callback: (err: types.IError | null) => void) => {
        let reg: any[];
        try {
            if (order.startsWith('CB')) {
                reg = await fn.table('Booking').where('bookingToken', order, '=').promise();
            } else {
                reg = await fn.table('InvitedGuest').where('guestToken', order, '=').promise();
            }

            // errors
            if (reg.length === 0) {
                callback({ code: 400, message: 'Invalid Invitation token given' });
                return;
            }
            if (order.startsWith('CB')) {
                const bookingDate = moment(reg[0].bookingDate, dateFormat);
                if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                    callback({ code: 500, message: 'You can not create the order at this time' });
                    return;
                }
            } else {
                const reg2 = await fn.table('Booking', reg[0].idBooking).promise();
                const bookingDate = moment(reg2[0].bookingDate, dateFormat);
                if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                    callback({ code: 500, message: 'You can not create the order at this time' });
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
    },
    cancelInvitation: async (token: string, callback: (err: types.IError | null) => void) => {
        let reg: dbtypes.IBooking[];
        try {
            reg = await fn.table('Booking').where('bookingToken', token, '=').promise();

            // errors
            if (reg.length === 0) {
                callback({ code: 400, message: 'Invalid token given' });
                return;
            }

            if (reg[0].bookingType !== 'invitation') {
                callback({ code: 400, message: 'You can\'t cancel the booking' });
                return;
            }

            const bookingDate = moment(reg[0].bookingDate, dateFormat);
            if (bookingDate.diff(moment().add(1, 'hour')) < 0) {
                callback({ code: 500, message: 'You can\'t cancel the booking at this time' });
                return;
            }

            if (reg[0].canceled) {
                callback({ code: 500, message: 'Already canceled' });
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

        try {
            if (reg[0].guestList !== undefined && (reg[0].guestList as string[]).length > 0) {
                await fn.delete('InvitedGuest', (reg[0].guestList as string[])).promise();
            }
        } catch (err) {
            console.error(err);
            callback(err);
            await fn.insert('Booking', reg[0]).promise();
            return;
        }

        try {
            const order = await fn.table('Order').where('idBooking', reg[0].id, '=').promise();

            if (order.length > 0) {
                await fn.delete('Order', order.map((elem: any) => elem.id)).promise();
            }
        } catch (err) {
            console.error(err);
            callback(err);
            await fn.insert('Booking', reg[0]).promise();
            await fn.insert('InvitedGuest', (reg[0].guestList as string[])).promise();
            return;
        }

        callback(null);

        const reservation = await fn.table('Booking').promise();
        const invited = await fn.table('InvitedGuest').promise();
        const order = await fn.table('Order').promise();

        console.log('\n\n\n');
        console.log(reservation);
        console.log('\n\n\n');
        console.log(invited);
        console.log('\n\n\n');
        console.log(order);
        // TODO: send emails

    },
};
