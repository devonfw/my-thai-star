import { Credentials } from 'aws-sdk';
import { ActionConfigurationPropertyList } from 'aws-sdk/clients/codepipeline';
import { AccessControlPolicy } from 'aws-sdk/clients/s3';
import * as _ from 'lodash';
import dynamo from './data-collector/src/adapters/fn-dynamo';
import fn from './data-collector/src/index';
import * as dbtypes from './model/database';
import * as types from './model/interfaces';
import * as util from './utils/utilFunctions';

// Dynamo
const creds = new Credentials('akid', 'secret', 'session');
fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });

const maxPrice = 50;

export default {
    getDihses: async (callback: (err: types.IError | null, dishes?: types.IDishView[]) => void) => {
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

            let res = util.objectToArray(tables);*/

            const ingredients: dbtypes.IIngredient[] = await fn.table('Ingredient').promise();

            const dishes: types.IDishView[] = await fn.table('Dish').map(util.relation(ingredients, 'extras', 'id')).
            map(util.dishToDishview()).
                promise();

            callback(null, dishes);
        } catch (err) {
            callback(err);
        }
    },

    getDishesFiltered: async (filter: types.IFilterView,
                              callback: (err: types.IError | null, dishes?: types.IDishView[]) => void) => {
        // check filter values. Put the correct if neccessary
        const order = util.checkFilter(filter);

        try {
            // filter by category
            const catId: string[] | undefined = (filter.categories === null || filter.categories === undefined) ?
                undefined :
                filter.categories.map((elem: types.ICategoryView) => elem.id.toString());

            let dishCategories: string[] = [];
            let dishIdSet: Set<string> | undefined;

            if (catId) {
                dishCategories = await fn.table('Category', catId).
                    map((elem: dbtypes.ICategory) => elem.dishes).
                    promise();

                dishIdSet = new Set(_.flatten(dishCategories));

            }

            // filter by fav
            if (filter.isFab) {
                // TODO: take id using the authorization token
                const fav = await fn.table('User', '1').
                    promise();

                const s2: Set<string> = new Set(fav.favorites as string[]);

                dishIdSet = (dishIdSet !== undefined) ? util.setIntersection(dishIdSet, s2) : s2;
            }

            if (dishIdSet === undefined || dishIdSet.size > 0) {
                const ingredients: dbtypes.IIngredient[] = await fn.table('Ingredient').promise();

                const dishes: types.IDishView[] = await fn.
                    table('Dish', (dishIdSet !== undefined) ? [...dishIdSet] : undefined).
                    map(util.relation(ingredients, 'extras', 'id')).
                    where('price', filter.maxPrice, '<=').
                    filter((o: any) => _.lowerCase(o.name).includes(_.lowerCase(filter.searchBy))).
                    map(util.dishToDishview()).
                    promise();

                // TODO: filtrar por likes

                /*if (filter.searchBy) {
                    dishes = _.filter(dishes, (o: any) => _.lowerCase(o.name).includes(_.lowerCase(filter.searchBy)));
                }*/

                callback(null, _.orderBy(dishes, order));
            } else {
                callback(null, []);
            }

        } catch (error) {
            callback(error);
        }
    },
};
