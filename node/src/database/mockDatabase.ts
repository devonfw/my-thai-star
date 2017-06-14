import * as types from '../model/database';
import { img } from './image';
import { serverURL } from '../config';

export const Ingredient: types.Ingredient[] = [
    {
        id: '0',
        name: 'Tofu',
        description: 'Also known as bean curd, is a food made by coagulating soy milk and then pressing the resulting curds into soft white blocks. ',
        price: 1.0000000000,
    },
    {
        id: '1',
        name: 'Extra curry',
        description: 'The common feature is the use of complex combinations of spices or herbs, usually including fresh or dried hot chillies.',
        price: 1.0000000000,
    }];

export const Dish: types.Dish[] = [
    {
        id: '0',
        name: 'Thai Spicy Basil Fried Rice',
        extras: ['0', '1'],
        description: 'This is a staple of Thai cooking. Adjust the spices to your own tastes for a really great use for leftover rice!! I get the basil from a local Asian market. It has a different flavor than that of regular basil and makes all the difference in this recipe. It is fast and fairly easy to make, but requires constant stirring',
        price: 12.9900000000,
        image: {
            name: 'basil-fried',
            content: serverURL + '/images/basil-fried.jpg',
            contentType: 'url',
            mimeType: 'image/jpg',
        },
    }, {
        description: 'From the world-famous Gilroy Garlic Festival to a fierce 40-clove '
        + 'garlic chicken in San Francisco and a gut-busting garlic sandwich in Philly, '
        + 'we feature the tastiest places to get your garlic on.',
        extras: ['1'],
        id: '1',
        image: {
            name: 'garlic-paradise',
            content: serverURL + '/images/garlic-paradise.jpg',
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 50,
        name: 'Garlic Paradise',
        price: 7.9900000000,
    }, {
        description: 'Master this aromatic, creamy & extremely tasty chicken Thai '
        + 'green curry recipe from Jamie Oliver & treat yourself to an authentic taste of South East Asia.',
        extras: ['0', '1'],
        id: '2',
        image: {
            name: 'green-curry',
            content: serverURL + '/images/green-curry.jpg',
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
        extras: ['0'],
        id: '3',
        image: {
            name: 'Thai-Peanut',
            content: serverURL + '/images/Thai-Peanut.jpg',
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
        extras: ['1'],
        id: '4',
        image: {
            name: 'Thai-thighs',
            content: serverURL + '/images/Thai-thighs.jpg',
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
        extras: ['0', '1'],
        id: '5',
        image: {
            name: 'thai-roasted',
            content: serverURL + '/images/thai-roasted.jpg',
            contentType: 'url',
            mimeType: 'image/jpg',
        },
        // likes: 4,
        name: 'Thai Roasted',
        price: 22.1500000000,
    },
];

export const Category: types.Category[] = [
    {
        id: '0',
        name: 'Main Dishes',
        description: 'Main Dishes',
        showOrder: 0,
    }, {
        id: '1',
        name: 'Starter',
        description: 'Starter Dishes',
        showOrder: 1,
    }, {
        id: '2',
        name: 'Dessert',
        description: 'Dessert',
        showOrder: 2,
    }, {
        id: '3',
        name: 'Noodle',
        description: 'Dishes that contain noodles',
        showOrder: 2,
    }, {
        id: '4',
        name: 'Rice',
        description: 'Dishes that contain rice',
        showOrder: 2,
    }, {
        id: '5',
        name: 'Curry',
        description: 'Dishes with curry',
        showOrder: 2,
    }, {
        id: '6',
        name: 'Vegan',
        description: 'Vegan food',
        showOrder: 2,
    }, {
        id: '7',
        name: 'Vegetarian',
        description: 'Vegetarian food',
        showOrder: 2,
    },
];

export const DishCategory: types.DishCategory[] = [
    {
        id: '0',
        idDish: '0',
        idCategory: '0',
    }, {
        id: '1',
        idDish: '0',
        idCategory: '4',
    }, {
        id: '2',
        idDish: '0',
        idCategory: '7',
    }, {
        id: '3',
        idDish: '1',
        idCategory: '0',
    }, {
        id: '4',
        idDish: '2',
        idCategory: '0',
    }, {
        id: '5',
        idDish: '2',
        idCategory: '5',
    }, {
        id: '6',
        idDish: '3',
        idCategory: '6',
    }, {
        id: '7',
        idDish: '3',
        idCategory: '7',
    }, {
        id: '8',
        idDish: '4',
        idCategory: '1',
    }, {
        id: '9',
        idDish: '5',
        idCategory: '1',
    },
];

export const UserRole: types.UserRole[] = [
    {
        id: '0',
        name: 'CUSTOMER',
        active: true,
    }, {
        id: '1',
        name: 'WAITER',
        active: true,
    },
];

export const User: types.User[] = [
    {
        email: 'waiter@waiter.com',
        favourites: [],
        id: '0',
        password: 'waiter',
        role: '1',
        userName: 'waiter',
    },
    {
        email: 'user0@gmail.com',
        favourites: [],
        id: '1',
        password: 'password',
        role: '0',
        userName: 'user0',
    },
];

export const Table: types.Table[] = [
{
    id: '0',
    seatsNumber: 4,
    }, {
    id: '1',
    seatsNumber: 4,
    }, {
    id: '2',
    seatsNumber: 4,
    }, {
    id: '3',
    seatsNumber: 4,
    }, {
    id: '4',
    seatsNumber: 6,
    }, {
    id: '5',
    seatsNumber: 6,
    }, {
    id: '6',
    seatsNumber: 6,
    }, {
    id: '7',
    seatsNumber: 8,
    }, {
    id: '8',
    seatsNumber: 8,
    },
];