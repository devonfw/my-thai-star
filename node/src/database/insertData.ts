import { Credentials } from 'aws-sdk';
import * as uuid from 'uuid';
// import * as dynamo from "../data-collector/src/adapters/fn-dynamo";
import dynamo from '../data-collector/src/adapters/fn-dynamo';
import * as s3 from '../data-collector/src/adapters/fn-s3';
import fn from '../data-collector/src/index';
import * as types from '../model/database';

// Dynamo
let creds;
if (!process.env.MODE || process.env.MODE.trim() !== 'test') {
    creds = new Credentials('akid', 'secret', 'session');
    fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
} else {
    creds = new Credentials('akid2', 'secret2', 'session2');
    fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
}
// fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });

const Ingredients: types.IIngredient[] = [
    {
        description:
        'The common feature is the use of complex combinations of spices or herbs , '
        + 'usually including fresh or dried hot chillies.',
        id: '1',
        name: 'Extra curry',
        price: 1,
    }, {
        description: 'ofu, also known as bean curd, is a food made by coagulating '
        + 'soy milk and then pressing the resulting curds into soft white blocks.',
        id: '2',
        name: 'Tofu',
        price: 8,
    }, {
        description: 'Lorem ipsum dolor. Pellentesque habitant morbi tristique.',
        id: '3',
        name: 'Chiken',
        price: 1,
    }, {
        description: 'Lorem ipsum dolor. Pellentesque habitant morbi tristique.',
        id: '4',
        name: 'Pork',
        price: 2,
    }];

const Dishes: types.IDish[] = [
    {
        description: 'This is a staple of Thai cooking. Adjust the spices to your own '
        + 'tastes for a really great use for leftover rice!! I get the basil from a '
        + 'local Asian market. It has a different flavor than that of regular basil '
        + 'and makes all the difference in this recipe. It is fast and fairly easy '
        + 'to make, but requires constant stirring',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '0',
        image: 'Dish/basil-fried.jpg',
        // likes: 1,
        name: 'Thai Spicy Basil Fried Rice',
        price: 12.9900000000,
    }, {
        description: 'From the world-famous Gilroy Garlic Festival to a fierce 40-clove '
        + 'garlic chicken in San Francisco and a gut-busting garlic sandwich in Philly, '
        + 'we feature the tastiest places to get your garlic on.',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '1',
        image: 'Dish/garlic-paradise.jpg',
        // likes: 50,
        name: 'Garlic Paradise',
        price: 7.9900000000,
    }, {
        description: 'Master this aromatic, creamy & extremely tasty chicken Thai '
        + 'green curry recipe from Jamie Oliver & treat yourself to an authentic taste of South East Asia.',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '2',
        image: 'Dish/green-curry.jpg',
        // likes: 30,
        name: 'Thai green chicken curry',
        price: 14.7500000000,
    }, {
        description: 'This easy no-cook peanut sauce has a terrific authentic '
        + 'Thai taste. It is spicy and peanutty, and is perfect as a dipping sauce for chicken, '
        + 'shrimp, and beef...or even to use tossed with warm cooked noodles for a quick pasta dish.',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '3',
        image: 'Dish/Thai-Peanut.jpg',
        // likes: 150,
        name: 'Thai Peanut',
        price: 12.2500000000,
    }, {
        description: 'Grill over a smoker or just brown in the oven - '
        + 'these moreish chicken pieces are marinated in a blend of lime and '
        + 'pineapple juice, chilli and ginger.',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '4',
        image: 'Dish/Thai-thighs.jpg',
        // likes: 4,
        name: 'Thai Thighs',
        price: 8.9900000000,
    }, {
        description: 'This recipe takes that same approach, but instead of lemon '
        + 'as the primary flavor, we’re mixing up a Thai-inspired sauce of lime, '
        + 'a little brown sugar, Sriracha, soy, fish sauce, ginger, and garlic. '
        + 'It may sound like a lot of ingredients, but I bet you have most of these '
        + 'sitting in your pantry already!',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '5',
        image: 'Dish/thai-roasted.jpg',
        // likes: 4,
        name: 'Thai Roasted',
        price: 22.1500000000,
    }, {
        // Id: uuid.v1(),
        description:
        'Lorem ipsum dolor sit amet. Proin fermentum lobortis neque. ' +
        'Pellentesque habitant morbi tristique.',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '6',
        // favourite: false,
        image: '../../assets/images/basil-fried.jpg',
        // likes: 21,
        name: 'Red Curry',
        price: 5.90,
    }, {
        // Id: uuid.v1(),
        description:
        'Consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. ' +
        'Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '7',
        // favourite: false,
        image: '../../assets/images/garlic-paradise.jpg',
        // Likes: 10,
        name: 'Purple Curry',
        price: 9.00,
    }, {
        // Id: uuid.v1(),
        description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque.',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '8',
        // favourite: false,
        image: '../../assets/images/green-curry.jpg',
        // likes: 61,
        name: 'Green Curry',
        price: 7.60,
    }, {
        // Id: uuid.v1(),
        description: 'Lorem ipsum dolor. Pellentesque habitant morbi tristique.',
        extras: [Ingredients[0].id, Ingredients[3].id],
        id: '9',
        // favourite: false,
        image: '../../assets/images/dish.png',
        // likes: 48,
        name: 'Yellow Curry',
        price: 8.50,
    }];

const categories: types.ICategory[] = [
    {
        description: 'Alguna tendrá',
        group: 1,
        id: '1',
        name: 'Main dishes',
        showOrder: 0,
    },
    {
        description: 'Alguna tendrá',
        group: 1,
        id: '2',
        name: 'Starter',
        showOrder: 1,
    },
    {
        description: 'Alguna tendrá',
        group: 1,
        id: '3',
        name: 'Dessert',
        showOrder: 2,
    },
    {
        description: 'Alguna tendrá',
        group: 2,
        id: '4',
        name: 'Noodle',
        showOrder: 3,
    },
    {
        description: 'Alguna tendrá',
        group: 2,
        id: '5',
        name: 'Rice',
        showOrder: 4,
    },
    {
        description: 'Alguna tendrá',
        group: 2,
        id: '6',
        name: 'Curry',
        showOrder: 5,
    },
    {
        description: 'Alguna tendrá',
        group: 3,
        id: '7',
        name: 'Vegan',
        showOrder: 6,
    },
    {
        description: 'Alguna tendrá',
        group: 3,
        id: '8',
        name: 'Vegetarian',
        showOrder: 7,
    },
];

const dishCategory: types.IDishCategory[] = [
    {
        id: '0',
        idDish: '0',
        idCategory: '1',
    },
    {
        id: '1',
        idDish: '1',
        idCategory: '1',
    },
];

const users: types.IUser[] = [
    {
        email: 'dario@capge.com',
        favourites: [
            '1', '3',
        ],
        id: '1',
        password: 'holaketal',
        role: '2',
        userName: 'Dario',
    },
];

fn.insert('Dish', Dishes).then((res: string) => {
    console.log('\nAll dishes inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('Ingredient', Ingredients).then((res: string) => {
    console.log('\nAll ingredients inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('Category', categories).then((res: string) => {
    console.log('\nAll categories inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('DishCategory', dishCategory).then((res: string) => {
    console.log('\nAll dishCategory inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('User', users).then((res: string) => {
    console.log('\nAll Users inserted');
    console.log(res);

    const user2 = users[0];
}, (err: Error) => {
    console.error(err);
});

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
