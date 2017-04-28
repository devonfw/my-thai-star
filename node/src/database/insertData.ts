import { Credentials } from "aws-sdk";
import * as uuid from "uuid";
import * as dynamo from "../data-collector/src/adapters/fn-dynamo";
import * as s3 from "../data-collector/src/adapters/fn-s3";
import fn from "../data-collector/src/index";

// Dynamo
const creds = new Credentials("akid", "secret", "session");
fn.setDB(dynamo, { endpoint: "http://localhost:8000/", region: "us-west-2", credentials: creds });

const Dishes = [
    {
    // Id: uuid.v1(),
    Id: "1",
    // favourite: false,
    Image: "../../assets/images/basil-fried.jpg",
    Likes: 21,
    Description:
    "Lorem ipsum dolor sit amet. Proin fermentum lobortis neque. " +
    "Pellentesque habitant morbi tristique.",
    Name: "Red Curry",
    Price: 5.90,
}, {
    // Id: uuid.v1(),
    Id: "2",
    //favourite: false,
    Image: "../../assets/images/garlic-paradise.jpg",
    Likes: 10,
    Description:
    "Consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. " +
    "Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.",
    Name: "Purple Curry",
    Price: 9.00,
}, {
    // Id: uuid.v1(),
    Id: "3",
    //favourite: false,
    Image: "../../assets/images/green-curry.jpg",
    Likes: 61,
    Description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque.",
    Name: "Green Curry",
    Price: 7.60,
},{
    // Id: uuid.v1(),
    Id: "4",
    //favourite: false,
    Image: "../../assets/images/dish.png",
    Likes: 48,
    Description: "Lorem ipsum dolor. Pellentesque habitant morbi tristique.",
    Name: "Yellow Curry",
    Price: 8.50,
}];

const Ingredients = [
    { 
        Id: "1",
        Name: "Tofu", 
        Description: "Lorem ipsum dolor. Pellentesque habitant morbi tristique.",
        Price: 1, 
    }, { 
        Id: "2",
        Name: "Chiken", 
        Description: "Lorem ipsum dolor. Pellentesque habitant morbi tristique.",
        Price: 1, 
    }, { 
        Id: "3",
        Name: "Pork", 
        Description: "Lorem ipsum dolor. Pellentesque habitant morbi tristique.",
        Price: 2, 
    }];

const DishIngredient = [
    {
        Id: uuid.v1(),
        IdDish: "1",
        IdIngredient: "1"
    }, {
        Id: uuid.v1(),
        IdDish: "1",
        IdIngredient: "2"
    }, {
        Id: uuid.v1(),
        IdDish: "1",
        IdIngredient: "3"
    }, {
        Id: uuid.v1(),
        IdDish: "2",
        IdIngredient: "1"
    }, {
        Id: uuid.v1(),
        IdDish: "2",
        IdIngredient: "2"
    }, {
        Id: uuid.v1(),
        IdDish: "2",
        IdIngredient: "3"
    }, {
        Id: uuid.v1(),
        IdDish: "3",
        IdIngredient: "1"
    }, {
        Id: uuid.v1(),
        IdDish: "3",
        IdIngredient: "2"
    }, {
        Id: uuid.v1(),
        IdDish: "3",
        IdIngredient: "3"
    }, {
        Id: uuid.v1(),
        IdDish: "4",
        IdIngredient: "1"
    }, {
        Id: uuid.v1(),
        IdDish: "4",
        IdIngredient: "2"
    }, {
        Id: uuid.v1(),
        IdDish: "4",
        IdIngredient: "3"
    }];

fn.insert('Dish', Dishes).then((res: string) => {
    console.log('\nAll dishes inserted');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});

fn.insert("Ingredient", Ingredients).then((res: string) => {
    console.log('\nAll ingredients inserted');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});

fn.insert("DishIngredient", DishIngredient).then((res: string) => {
    console.log('\nAll ingredients inserted');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});