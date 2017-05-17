import { ReservationView } from '../models/interfaces';
import { Dish } from './dishes/dish';
import { LoginInfo } from './login/loginInfo';

export const dishes: Dish[] = [{
                favourite: false,
                image: '../../../assets/images/basil-fried.jpg',
                likes: 21,
                options: [
                        { name: 'Tofu', price: 1, selected: false },
                        { name: 'Chiken', price: 1, selected: false },
                        { name: 'Pork', price: 2, selected: false }],
                orderDescription:
                'Lorem ipsum dolor sit amet. Proin fermentum lobortis neque. ' +
                'Pellentesque habitant morbi tristique.',
                orderName: 'Red Curry',
                price: 5.90,
                categories: {
                        main: true,
                        starter: false,
                        dessert: false,
                        noodle: true,
                        rice: false,
                        curry: true,
                        vegan: true,
                        vegetarian: true,
                },
        }, {
                favourite: false,
                image: '../../../assets/images/garlic-paradise.jpg',
                likes: 10,
                options: [
                        { name: 'Tofu', price: 1, selected: false },
                        { name: 'Chiken', price: 1, selected: false },
                        { name: 'Pork', price: 2, selected: false }],
                orderDescription:
                        'Consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. ' +
                        'Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.',
                orderName: 'Purple Curry',
                price: 9.00,
                categories: {
                        main: false,
                        starter: true,
                        dessert: false,
                        noodle: false,
                        rice: true,
                        curry: true,
                        vegan: false,
                        vegetarian: false,
                },
        }, {
                favourite: false,
                image: '../../../assets/images/green-curry.jpg',
                likes: 61,
                options: [
                        { name: 'Tofu', price: 1, selected: false },
                        { name: 'Chiken', price: 1, selected: false },
                        { name: 'Pork', price: 2, selected: false }],
                orderDescription:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                        'Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque.',
                orderName: 'Green Curry',
                price: 7.60,
                categories: {
                        main: false,
                        starter: false,
                        dessert: true,
                        noodle: false,
                        rice: true,
                        curry: false,
                        vegan: true,
                        vegetarian: true,
                },
        }, {
                favourite: false,
                image: '../../../assets/images/dish.png',
                likes: 48,
                options: [
                        { name: 'Tofu', price: 1, selected: false },
                        { name: 'Chiken', price: 1, selected: false },
                        { name: 'Pork', price: 2, selected: false }],
                orderDescription: 'Lorem ipsum dolor. Pellentesque habitant morbi tristique.',
                orderName: 'Yellow Curry',
                price: 8.50,
                categories: {
                        main: true,
                        starter: false,
                        dessert: false,
                        noodle: true,
                        rice: true,
                        curry: true,
                        vegan: true,
                        vegetarian: true,
                },
        }];

export const users: LoginInfo[] = [{
        username: 'user',
        password: 'pass',
        role: 'user',
        }, {
        username: 'waiter',
        password: 'pass',
        role: 'waiter',
        }];

export const bookedTables: ReservationView[] = [{
        date: '19/03/2017',
        hour: '22:00',
        creationDate: '11/03/2017',
        creationHour: '12:45',
        nameOwner: 'Brok',
        emailOwner: 'email1@email.com',
        reservationId: 0,
        orders: [{
                  orderName: 'Pad Kee Mao',
                  price: 5.90,
                  options: [{name: 'Chicken', price: 2, selected: true}],
                  number: 1,
                  comment: 'Hello mom!',
                }, {
                  orderName: 'Red Curry',
                  price: 5.90,
                  options: [],
                  number: 1,
                  comment: 'I want it really red',
                }],
        friends: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                        {email: 'emailFriend2@email.com', acceptance: 'yes'},
                        {email: 'emailFriend3@email.com', acceptance: ''}],
        }, {
        date: '13/03/2017',
        hour: '21:45',
        creationDate: '17/03/2017',
        creationHour: '23:30',
        nameOwner: 'Jesse',
        emailOwner: 'email2@email.com',
        reservationId: 1,
        orders: [{
                  orderName: 'Red Curry',
                  price: 5.90,
                  options: [{name: 'Pork', price: 1, selected: true},
                            {name: 'Tofu', price: 1, selected: true},
                            {name: 'Chicken', price: 2, selected: true}],
                  number: 1,
                  comment: 'I hope this curry worths the price',
                }, {
                  orderName: 'Red Curry',
                  price: 5.90,
                  options: [{name: 'Pork', price: 1, selected: true}],
                  number: 1,
                  comment: 'hot sauce',
                }],
        friends: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                        {email: 'emailFriend2@email.com', acceptance: 'no'}],
        }, {
        date: '15/03/2017',
        hour: '21:00',
        creationDate: '17/03/2017',
        creationHour: '17:12',
        nameOwner: 'James',
        emailOwner: 'email3@email.com',
        reservationId: 2,
        orders: [{
                  orderName: 'Red Curry',
                  price: 5.90,
                  options: [{name: 'Pork', price: 1, selected: true},
                            {name: 'Tofu', price: 1, selected: true}],
                  number: 1,
                  comment: 'it would be nice if the pork can be well-cooked',
                }],
        friends: [],
        }, {
        date: '16/03/2017',
        hour: '20:45',
        creationDate: '17/03/2017',
        creationHour: '18:45',
        nameOwner: 'Mara',
        emailOwner: 'email4@email.com',
        reservationId: 3,
        orders: [{
                  orderName: 'Green Curry',
                  price: 7.90,
                  options: [{name: 'Tofu', price: 1, selected: true}],
                  number: 1,
                  comment: '',
                }, {
                  orderName: 'Purple Curry',
                  price: 6.70,
                  options: [],
                  number: 2,
                  comment: 'one without tomatoe',
                }, {
                  orderName: 'Brown Curry',
                  price: 5.40,
                  options: [],
                  number: 1,
                  comment: '',
                }, {
                  orderName: 'Yellow Curry',
                  price: 8.20,
                  options: [{name: 'Chicken', price: 1, selected: true}],
                  number: 1,
                  comment: '',
                }, {
                  orderName: 'Blue Curry',
                  price: 9.00,
                  options: [{name: 'Pork', price: 2, selected: true}],
                  number: 2,
                  comment: '',
                }, {
                  orderName: 'Black Curry',
                  price: 3.50,
                  options: [],
                  number: 4,
                  comment: 'extra sauce',
                }],
        friends: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                        {email: 'emailFriend2@email.com', acceptance: 'no'},
                        {email: 'emailFriend3@email.com', acceptance: 'yes'},
                        {email: 'emailFriend4@email.com', acceptance: ''},
                        {email: 'emailFriend5@email.com', acceptance: 'yes'}],
        }];
