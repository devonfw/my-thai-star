import { Credentials } from "aws-sdk";
import * as uuid from "uuid";
import * as dynamo from "../data-collector/src/adapters/fn-dynamo";
import * as s3 from "../data-collector/src/adapters/fn-s3";
import fn from "../data-collector/src/index";

// Dynamo
const creds = new Credentials("akid", "secret", "session");
fn.setDB(dynamo, { endpoint: "http://localhost:8000/", region: "us-west-2", credentials: creds });

fn.insert('Dish', {
    id: uuid.v1(),
    //favourite: false,
    image: "../../assets/images/basil-fried.jpg",
    likes: 21,
    orderDescription:
    "Lorem ipsum dolor sit amet. Proin fermentum lobortis neque. " +
    "Pellentesque habitant morbi tristique.",
    orderName: "Red Curry",
    price: 5.90,
}).then((res: string) => {
    console.log('\nInsert of the Dish: orderName: "Red Curry"');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});

fn.insert('Dish', {
    id: uuid.v1(),
    //favourite: false,
    image: "../../assets/images/garlic-paradise.jpg",
    likes: 10,
    orderDescription:
    "Consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. " +
    "Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.",
    orderName: "Purple Curry",
    price: 9.00,
}).then((res: string) => {
    console.log('\nInsert of the Dish: orderName: "Purple Curry"');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});

fn.insert('Dish', {
    id: uuid.v1(),
    //favourite: false,
    image: "../../assets/images/green-curry.jpg",
    likes: 61,
    orderDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque.",
    orderName: "Green Curry",
    price: 7.60,
}).then((res: string) => {
    console.log('\nInsert of the Dish: orderName: "Green Curry"');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});

fn.insert('Dish', {
    id: uuid.v1(),
    //favourite: false,
    image: "../../assets/images/dish.png",
    likes: 48,
    orderDescription: "Lorem ipsum dolor. Pellentesque habitant morbi tristique.",
    orderName: "Yellow Curry",
    price: 8.50,
}).then((res: string) => {
    console.log('\nInsert of the Dish: orderName: "Yellow Curry"');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});

