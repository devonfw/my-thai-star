import { Credentials } from "aws-sdk";
import * as dynamo from "./data-collector/src/adapters/fn-dynamo";
import * as s3 from "./data-collector/src/adapters/fn-s3";
import fn from "./data-collector/src/index";
import * as _ from "lodash";

// Dynamo
const creds = new Credentials("akid", "secret", "session");
fn.setDB(dynamo, { endpoint: "http://localhost:8000/", region: "us-west-2", credentials: creds });

export default {
    getDihses: async (callback: Function) => {
        /* Older way to get all dishes. I dont like it.
        try {
            let res = await fn.table('Ingredient').
                table('DishIngredient').
                join('Id', 'IdIngredient').
                //table('Ingredient').
                //join('IdIngredient', 'Id').
                promise();
            let res2 = await fn.table("Dish").
                promise();

            res2 = res2.map((elem: any) => {
                return {
                    image: elem.Image,
                    likes: elem.Likes,
                    orderDescription: elem.Description,
                    orderName: elem.Name,
                    price: elem.Price,
                    options: res.filter((elem2: any) => {
                        return elem2.IdDish === elem.Id;
                    }).map((elem2: any) => {
                        return _.pick(elem2, ["Name", "Price", "Description"]);
                    }).map((elem2: any) => {
                        return {
                            name: elem2.Name,
                            price: elem2.Price,
                            description: elem2.Description,
                        };
                    }),
                    favourite: false,
                }
            });

            callback(null, res2);
        } catch (err) {
            callback(err);
        }*/
        try {
            let tables = await fn.table('Dish').
                map(renameProperties("Dish")).
                table('DishIngredient').
                join('DishId', 'IdDish').
                table('Ingredient').
                join('IdIngredient', 'Id').
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

            let res = [];
            for (let o in tables) {
                res.push(tables[o]);
            }

            callback(null, res);
        } catch (err) {
            callback(err);
        }
    }
}

function renameProperties(prefix: string) {
    return (element: any) => {
        let ob: any = {};

        for(let o in element){
            ob[prefix+o] = element[o];
        }

        return ob;
    }
}
