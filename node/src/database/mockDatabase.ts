import * as types from '../model/database';
import { img } from './image';

export const Ingredient: types.Ingredient[] = [
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

export const Dish: types.Dish[] = [
    {
        description: 'This is a staple of Thai cooking. Adjust the spices to your own '
        + 'tastes for a really great use for leftover rice!! I get the basil from a '
        + 'local Asian market. It has a different flavor than that of regular basil '
        + 'and makes all the difference in this recipe. It is fast and fairly easy '
        + 'to make, but requires constant stirring',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '0',
        image: {
            name: 'Dish/basil-fried.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 1,
        name: 'Thai Spicy Basil Fried Rice',
        price: 12.9900000000,
    }, {
        description: 'From the world-famous Gilroy Garlic Festival to a fierce 40-clove '
        + 'garlic chicken in San Francisco and a gut-busting garlic sandwich in Philly, '
        + 'we feature the tastiest places to get your garlic on.',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '1',
        image: {
            name: 'Dish/garlic-paradise.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 50,
        name: 'Garlic Paradise',
        price: 7.9900000000,
    }, {
        description: 'Master this aromatic, creamy & extremely tasty chicken Thai '
        + 'green curry recipe from Jamie Oliver & treat yourself to an authentic taste of South East Asia.',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '2',
        image: {
            name: 'Dish/green-curry.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 30,
        name: 'Thai green chicken curry',
        price: 14.7500000000,
    }, {
        description: 'This easy no-cook peanut sauce has a terrific authentic '
        + 'Thai taste. It is spicy and peanutty, and is perfect as a dipping sauce for chicken, '
        + 'shrimp, and beef...or even to use tossed with warm cooked noodles for a quick pasta dish.',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '3',
        image: {
            name: 'Dish/Thai-Peanut.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 150,
        name: 'Thai Peanut',
        price: 12.2500000000,
    }, {
        description: 'Grill over a smoker or just brown in the oven - '
        + 'these moreish chicken pieces are marinated in a blend of lime and '
        + 'pineapple juice, chilli and ginger.',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '4',
        image: {
            name: 'Dish/Thai-thighs.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 4,
        name: 'Thai Thighs',
        price: 8.9900000000,
    }, {
        description: 'This recipe takes that same approach, but instead of lemon '
        + 'as the primary flavor, we’re mixing up a Thai-inspired sauce of lime, '
        + 'a little brown sugar, Sriracha, soy, fish sauce, ginger, and garlic. '
        + 'It may sound like a lot of ingredients, but I bet you have most of these '
        + 'sitting in your pantry already!',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '5',
        image: {
            name: 'Dish/thai-roasted.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 4,
        name: 'Thai Roasted',
        price: 22.1500000000,
    }, {
        // Id: uuid.v1(),
        description:
        'Lorem ipsum dolor sit amet. Proin fermentum lobortis neque. ' +
        'Pellentesque habitant morbi tristique.',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '6',
        // favourite: false,
        image: {
            name: '../../assets/images/basil-fried.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 21,
        name: 'Red Curry',
        price: 5.90,
    }, {
        // Id: uuid.v1(),
        description:
        'Consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. ' +
        'Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '7',
        // favourite: false,
        image: {
            name: '../../assets/images/garlic-paradise.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // Likes: 10,
        name: 'Purple Curry',
        price: 9.00,
    }, {
        // Id: uuid.v1(),
        description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque.',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '8',
        // favourite: false,
        image: {
            name: '../../assets/images/green-curry.jpg',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 61,
        name: 'Green Curry',
        price: 7.60,
    }, {
        // Id: uuid.v1(),
        description: 'Lorem ipsum dolor. Pellentesque habitant morbi tristique.',
        extras: [Ingredient[0].id, Ingredient[3].id],
        id: '9',
        // favourite: false,
        image: {
            name: '../../assets/images/dish.png',
            content: img,
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 48,
        name: 'Yellow Curry',
        price: 8.50,
    }];

export const Category: types.Category[] = [
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

export const DishCategory: types.DishCategory[] = [
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

export const User: types.User[] = [
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

export const Table: types.Table[] = [
    {
        id: '1',
        seatsNumber: 3,
    },
    {
        id: '2',
        seatsNumber: 5,
    },
    {
        id: '3',
        seatsNumber: 5,
    },
    {
        id: '4',
        seatsNumber: 8,
    },
];