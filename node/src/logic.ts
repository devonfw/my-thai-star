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
    createReservation: async (reserv: types.IReservationView,
                              callback: (err: types.IError | null, resToken?: string) => void) => {
        const date = moment();
        const bookDate = moment(reserv.date);

        try {
            const reservation: dbtypes.IReservation = {
                id: util.getNanoTime().toString(),
                // TODO: get user from session or check if is a guest
                // userId: '1',
                name: reserv.name,
                email: reserv.email,
                reservationToken: 'CRS_' + moment().format('YYYYMMDD') + '_' + md5(reserv.email + moment().format('YYYYMMDDHHmmss')),
                bookingDate: bookDate.toJSON(),
                expirationDate: bookDate.add(1, 'hour').toJSON(), // TODO: modify this, maybe add 1 hour or delete this property
                creationDate: date.toJSON(),
                canceled: false,
                reservationType: reserv.type.name,
                assistants: (reserv.type.name === 'reservation') ? reserv.assistants : null,
                guestList: null,
                table: (reserv.type.name === 'reservation') ? util.getTable() : undefined,
            };

            const inv: dbtypes.IInvitationGuest[] = [];

            if (reserv.type.name === 'invitation' && reserv.guestList.length > 0) {
                // remove possible duplicates
                const emails: Set<string> = new Set(reserv.guestList);

                emails.forEach((elem: string) => {
                    const nanoTime = util.getNanoTime();
                    const now = moment();
                    inv.push({
                        id: nanoTime.toString(),
                        idReservation: reservation.reservationToken,
                        guestToken: 'GRS_' + now.format('YYYYMMDD') + '_' + md5(elem + now.format('YYYYMMDDHHmmss')),
                        email: elem,
                        accepted: null,
                        modificationDate: now.toJSON(),
                        order: undefined,
                    });
                });

                reservation.guestList = inv.map((elem: any): string => elem.id);
            }

            // TODO: send all mails

            callback(null, reservation.reservationToken);

            await fn.insert('Reservation', reservation).promise();
            if (inv.length > 0 || false) {
                await fn.insert('InvitationGuest', inv).promise();
            }

            // const res = await fn.table('Reservation').promise();
            // const res2 = await fn.table('InvitationGuest').promise();
            // console.log(res);
            // console.log('\n\n\n');
            // console.log(res2);
        } catch (err) {
            console.log(err);
            callback(err);
        }
    },
    createOrder: async (res: types.IOrderView, callback: (err: types.IError | null) => void) => {
        // check if exsist the token
        let register: dbtypes.IReservation[] | dbtypes.IInvitationGuest[];
        if (res.invitationId.startsWith('CRS')) {
            register = await fn.table('Reservation').where('reservationToken', res.invitationId, '=').promise();
        } else {
            register = await fn.table('InvitationGuest').where('guestToken', res.invitationId, '=').promise();
        }

        if (register.length === 0) {
            callback({ code: 400, message: 'muy mal' });
        }
    },
};
