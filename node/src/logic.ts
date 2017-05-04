import { Credentials } from "aws-sdk";
import fn from "./data-collector/src/index";
import dynamo from './data-collector/src/adapters/fn-dynamo';
import * as types from "./model/interfaces";
import * as _ from "lodash";
import * as util from "./utils/utilFunctions"

// Dynamo
const creds = new Credentials("akid", "secret", "session");
fn.setDB(dynamo, { endpoint: "http://localhost:8000/", region: "us-west-2", credentials: creds });

const maxPrice = 50;

export default {
    getDihses: async (callback: Function) => {
        try {
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

            let res = util.objectToArray(tables);

            callback(null, res);
        } catch (err) {
            console.log(err);
            callback(err);
        }
    },

    getCategories: async (filter: types.FilterView, callback: Function) => {
        let order = util.checkFilter(filter);

        try {
            let catId: string[] | undefined = (filter.categories === null || filter.categories === undefined) ? 
                undefined : 
                filter.categories.map((elem: types.CategoryView) => elem.id.toString());

            let categories: string[] = await fn.table('Category', catId).
                table('DishCategory').
                join('Id', 'IdCategory').
                project(['IdDish']).
                map((elem: any) => elem["IdDish"]).
                promise();

            let s: Set<string> = new Set(categories);

            if (filter.isFab) {
                // TODO: take id using the authorization token
                let fav = await fn.table('User', "1").
                    promise();

                let s2: Set<string> = new Set(<string[]>fav.Favorites);

                s = util.setIntersection(s, s2);
            }

            let dishes = await fn.table('Dish', [...s]).
                map(util.renameProperties("Dish")).
                table('DishIngredient').
                join('DishId', 'IdDish').
                table('Ingredient').
                join('IdIngredient', 'Id').
                where('DishPrice', filter.maxPrice, '<=').
                where('DishLikes', filter.minLikes, '>=').
                reduce((acum: any, elem: any) => {
                    if (acum[elem.DishName]) {
                        acum[elem.DishName].options.push({ name: elem.Name, price: elem.Price, selected: false });
                    } else {
                        acum[elem.DishName] = {
                            favourite: false,
                            image: elem.DishImage,
                            likes: elem.DishLikes,
                            options: [{ name: elem.Name, price: elem.Price, selected: false }],
                            orderDescription: elem.DishDescription,
                            orderName: elem.DishName,
                            price: elem.DishPrice,
                        };
                    }
                    return acum;
                }, {}).
                promise();

            dishes = util.objectToArray(dishes);

            if(filter.searchBy){
                dishes = _.filter(dishes, (o: any) => _.lowerCase(o.orderName).includes(_.lowerCase(filter.searchBy)));
            }

            callback(null, _.orderBy(dishes, order));
        } catch (error) {
            callback(error);
        }
    }
}
