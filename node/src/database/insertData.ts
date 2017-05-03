import { Credentials } from "aws-sdk";
import * as uuid from "uuid";
// import * as dynamo from "../data-collector/src/adapters/fn-dynamo";
import dynamo from '../data-collector/src/adapters/fn-dynamo';
import * as s3 from "../data-collector/src/adapters/fn-s3";
import fn from "../data-collector/src/index";
import * as types from "../model/interfaces";

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

const categories = [
    {
        Id: "1",
	    Name: "Main dishes",
	    Description: "Alguna tendrá",
	    Group: 1,
	    Order: 0,
    },
    {
        Id: "2",
	    Name: "Starter",
	    Description: "Alguna tendrá",
	    Group: 1,
	    Order: 1,
    },
    {
        Id: "3",
	    Name: "Dessert",
	    Description: "Alguna tendrá",
	    Group: 1,
	    Order: 2,
    },
    {
        Id: "4",
	    Name: "Noodle",
	    Description: "Alguna tendrá",
	    Group: 2,
	    Order: 3,
    },
    {
        Id: "5",
	    Name: "Rice",
	    Description: "Alguna tendrá",
	    Group: 2,
	    Order: 4,
    },
    {
        Id: "6",
	    Name: "Curry",
	    Description: "Alguna tendrá",
	    Group: 2,
	    Order: 5,
    },
    {
        Id: "7",
	    Name: "Vegan",
	    Description: "Alguna tendrá",
	    Group: 3,
	    Order: 6,
    },
    {
        Id: "8",
	    Name: "Vegetarian",
	    Description: "Alguna tendrá",
	    Group: 3,
	    Order: 7,
    },
];

const dishCategory = [
    {
        Id: uuid.v1(),
        IdDish: "1",
        IdCategory: "1"
    }, {
        Id: uuid.v1(),
        IdDish: "1",
        IdCategory: "2"
    },
];

const users = [
    {
        Id: "1",
        Name: "Dario",
        Email: "dario@capge.com",
        Favorites: [
            "1", "3"
        ]
    }
]

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

fn.insert("Category", categories).then((res: string) => {
    console.log('\nAll categories inserted');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});

fn.insert("DishCategory", dishCategory).then((res: string) => {
    console.log('\nAll DishCategory inserted');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});

fn.insert("User", users).then((res: string) => {
    console.log('\nAll Users inserted');
    console.log(res);
}, (err: Error) => {
    console.log(err)
});