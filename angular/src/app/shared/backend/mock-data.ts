import { ExtraView, ReservationView } from '../viewModels/interfaces';
import { Dish, LoginInfo } from './backendModels/interfaces';

export const extras: ExtraView[] = [{
                id: 0,
                name: 'Tofu',
                price: 1,
        }, {
                id: 1,
                name: 'Chiken',
                price: 2,
        }, {
                id: 2,
                name: 'Pork',
                price: 2,
        }];

export const dishes: Dish[] = [{
                isfav: false,
                image: '../../../assets/images/basil-fried.jpg',
                likes: 21,
                extras: [
                        { id: 0, name: 'Tofu', price: 1, selected: false },
                        { id: 1, name: 'Chiken', price: 1, selected: false },
                        { id: 2, name: 'Pork', price: 2, selected: false }],
                description:
                'Lorem ipsum dolor sit amet. Proin fermentum lobortis neque. ' +
                'Pellentesque habitant morbi tristique.',
                name: 'Red Curry',
                price: 5.90,
                categories: [
                        {id: '0'},
                        {id: '3'},
                        {id: '5'},
                        {id: '6'},
                        {id: '7'}],
        }, {
                isfav: false,
                image: '../../../assets/images/garlic-paradise.jpg',
                likes: 10,
                extras: [
                        { id: 0, name: 'Tofu', price: 1, selected: false },
                        { id: 1, name: 'Chiken', price: 1, selected: false },
                        { id: 2, name: 'Pork', price: 2, selected: false }],
                description:
                        'Consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. ' +
                        'Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.',
                name: 'Purple Curry',
                price: 9.00,
                categories: [
                        {id: '1'},
                        {id: '6'}],
        }, {
                isfav: false,
                image: '../../../assets/images/green-curry.jpg',
                likes: 61,
                extras: [
                        { id: 0, name: 'Tofu', price: 1, selected: false },
                        { id: 1, name: 'Chiken', price: 1, selected: false },
                        { id: 2, name: 'Pork', price: 2, selected: false }],
                description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                        'Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque.',
                name: 'Green Curry',
                price: 7.60,
                categories: [
                        {id: '2'},
                        {id: '4'},
                        {id: '6'}],
        }, {
                isfav: false,
                image: '../../../assets/images/dish.png',
                likes: 48,
                extras: [
                        { id: 0, name: 'Tofu', price: 1, selected: false },
                        { id: 1, name: 'Chiken', price: 1, selected: false },
                        { id: 2, name: 'Pork', price: 2, selected: false }],
                description: 'Lorem ipsum dolor. Pellentesque habitant morbi tristique.',
                name: 'Yellow Curry',
                price: 8.50,
                categories: [
                        {id: '1'},
                        {id: '4'},
                        {id: '7'}],
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
        dateTime: '19/03/2017 22:00',
        creationDateTime: '11/03/2017 12:45',
        nameOwner: 'Brok',
        emailOwner: 'email1@email.com',
        bookingId: 500,
        tableId: 0,
        orders: [{
                  name: 'Pad Kee Mao',
                  price: 5.90,
                  extras: [{id: 1, name: 'Chicken', price: 2, selected: true}],
                  amount: 1,
                  comment: 'Hello mom!',
                }, {
                  name: 'Red Curry',
                  price: 5.90,
                  extras: [],
                  amount: 1,
                  comment: 'I want it really red',
                }],
        friends: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                        {email: 'emailFriend2@email.com', acceptance: 'yes'},
                        {email: 'emailFriend3@email.com', acceptance: ''}],
        }, {
        dateTime: '13/03/2017 21:45',
        creationDateTime: '17/03/2017 23:30',
        nameOwner: 'Jesse',
        emailOwner: 'email2@email.com',
        bookingId: 501,
        tableId: 1,
        orders: [{
                  name: 'Red Curry',
                  price: 5.90,
                  extras: [{id: 2, name: 'Pork', price: 1, selected: true},
                           {id: 0, name: 'Tofu', price: 1, selected: true},
                           {id: 1, name: 'Chicken', price: 2, selected: true}],
                  amount: 1,
                  comment: 'I hope this curry worths the price',
                }, {
                  name: 'Red Curry',
                  price: 5.90,
                  extras: [{id: 2, name: 'Pork', price: 1, selected: true}],
                  amount: 1,
                  comment: 'hot sauce',
                }],
        friends: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                  {email: 'emailFriend2@email.com', acceptance: 'no'}],
        }, {
        dateTime: '15/03/2017 21:00',
        creationDateTime: '17/03/2017 17:12',
        nameOwner: 'James',
        emailOwner: 'email3@email.com',
        bookingId: 502,
        tableId: 2,
        orders: [{
                  name: 'Red Curry',
                  price: 5.90,
                  extras: [{id: 2, name: 'Pork', price: 1, selected: true},
                           {id: 0, name: 'Tofu', price: 1, selected: true}],
                  amount: 1,
                  comment: 'it would be nice if the pork can be well-cooked',
                }],
        friends: [],
        }, {
        dateTime: '16/03/2017 20:45',
        creationDateTime: '17/03/2017 18:45',
        nameOwner: 'Mara',
        emailOwner: 'email4@email.com',
        bookingId: 503,
        tableId: 3,
        orders: [{
                  name: 'Green Curry',
                  price: 7.90,
                  extras: [{id: 0, name: 'Tofu', price: 1, selected: true}],
                  amount: 1,
                  comment: '',
                }, {
                  name: 'Purple Curry',
                  price: 6.70,
                  extras: [],
                  amount: 2,
                  comment: 'one without tomatoe',
                }, {
                  name: 'Brown Curry',
                  price: 5.40,
                  extras: [],
                  amount: 1,
                  comment: '',
                }, {
                  name: 'Yellow Curry',
                  price: 8.20,
                  extras: [{id: 1, name: 'Chicken', price: 1, selected: true}],
                  amount: 1,
                  comment: '',
                }, {
                  name: 'Blue Curry',
                  price: 9.00,
                  extras: [{id: 2, name: 'Pork', price: 2, selected: true}],
                  amount: 2,
                  comment: '',
                }, {
                  name: 'Black Curry',
                  price: 3.50,
                  extras: [],
                  amount: 4,
                  comment: 'extra sauce',
                }],
        friends: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                        {email: 'emailFriend2@email.com', acceptance: 'no'},
                        {email: 'emailFriend3@email.com', acceptance: 'yes'},
                        {email: 'emailFriend4@email.com', acceptance: ''},
                        {email: 'emailFriend5@email.com', acceptance: 'yes'}],
        }];
