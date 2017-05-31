import { ExtraView, OrderListView, ReservationView } from '../viewModels/interfaces';
import { LoginInfo, Role } from './backendModels/interfaces';
import { DishView } from '../viewModels/interfaces';

export const extras: ExtraView[] = [{
                id: 0,
                name: 'Tofu',
                price: 1,
                selected: false,
        }, {
                id: 1,
                name: 'Chiken',
                price: 1,
                selected: false,
        }, {
                id: 2,
                name: 'Pork',
                price: 2,
                selected: false,
        }];

export const dishes: DishView[] = [{
                dish: {
                        id: 0,
                        description:
                        'Lorem ipsum dolor sit amet. Proin fermentum lobortis neque. ' +
                        'Pellentesque habitant morbi tristique.',
                        name: 'Red Curry',
                        price: 5.90,
                },
                isfav: false,
                image: {content: '../../../assets/images/basil-fried.jpg'},
                likes: 21,
                extras: [
                        { id: 0, name: 'Tofu', price: 1, selected: false },
                        { id: 1, name: 'Chiken', price: 1, selected: false },
                        { id: 2, name: 'Pork', price: 2, selected: false }],
                categories: [
                        {id: '0'},
                        {id: '3'},
                        {id: '5'},
                        {id: '6'},
                        {id: '7'}],
        }, {
                dish: {
                        id: 1,
                        description:
                                'Consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. ' +
                                'Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.',
                        name: 'Purple Curry',
                        price: 9.00,
                },
                isfav: false,
                image: {content: '../../../assets/images/garlic-paradise.jpg'},
                likes: 10,
                extras: [
                        { id: 0, name: 'Tofu', price: 1, selected: false },
                        { id: 1, name: 'Chiken', price: 1, selected: false },
                        { id: 2, name: 'Pork', price: 2, selected: false }],
                categories: [
                        {id: '1'},
                        {id: '6'}],
        }, {
                dish: {
                        id: 2,
                        description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                                'Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque.',
                        name: 'Green Curry',
                        price: 7.60,
                },
                isfav: false,
                image: {content: '../../../assets/images/green-curry.jpg'},
                likes: 61,
                extras: [
                        { id: 0, name: 'Tofu', price: 1, selected: false },
                        { id: 1, name: 'Chiken', price: 1, selected: false },
                        { id: 2, name: 'Pork', price: 2, selected: false }],
                categories: [
                        {id: '2'},
                        {id: '4'},
                        {id: '6'}],
        }, {
                dish: {
                        id: 3,
                        description: 'Lorem ipsum dolor. Pellentesque habitant morbi tristique.',
                        name: 'Yellow Curry',
                        price: 8.50,
                },
                isfav: false,
                image: {content: '../../../assets/images/dish.png'},
                likes: 48,
                extras: [
                        { id: 0, name: 'Tofu', price: 1, selected: false },
                        { id: 1, name: 'Chiken', price: 1, selected: false },
                        { id: 2, name: 'Pork', price: 2, selected: false }],
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

export const roles: Role[] = [
        {name: 'user', permission: 0},
        {name: 'waiter', permission: 1},
];

export const bookedTables: ReservationView[] = [{
        bookingDate: '19/03/2017 22:00',
        creationDate: '11/03/2017 12:45',
        name: 'Brok',
        email: 'email1@email.com',
        bookingType: 1,
        assistants: 3,
        bookingId: 500,
        tableId: 0,
        invitedGuests: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                        {email: 'emailFriend2@email.com', acceptance: 'yes'},
                        {email: 'emailFriend3@email.com', acceptance: ''}],
        }, {
        bookingDate: '13/03/2017 21:45',
        creationDate: '17/03/2017 23:30',
        name: 'Jesse',
        email: 'email2@email.com',
        bookingType: 1,
        assistants: 2,
        bookingId: 501,
        tableId: 1,
        invitedGuests: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                  {email: 'emailFriend2@email.com', acceptance: 'no'}],
        }, {
        bookingDate: '15/03/2017 21:00',
        creationDate: '17/03/2017 17:12',
        name: 'James',
        email: 'email3@email.com',
        bookingType: 0,
        assistants: 4,
        bookingId: 502,
        tableId: 2,
        invitedGuests: [],
        }, {
        bookingDate: '16/03/2017 20:45',
        creationDate: '17/03/2017 18:45',
        name: 'Mara',
        email: 'email4@email.com',
        bookingType: 0,
        assistants: 1,
        bookingId: 503,
        tableId: 3,
        invitedGuests: [{email: 'emailFriend1@email.com', acceptance: 'yes'},
                        {email: 'emailFriend2@email.com', acceptance: 'no'},
                        {email: 'emailFriend3@email.com', acceptance: 'yes'},
                        {email: 'emailFriend4@email.com', acceptance: ''},
                        {email: 'emailFriend5@email.com', acceptance: 'yes'}],
        }];

export const orderList: OrderListView[] = [{
                bookingId: 500,
                booking: {
                            name: 'Name 1',
                            bookingDate: '13/03/2017 15:00',
                            creationDate: '10/03/2017 10:00',
                            email: 'user1@mail.com',
                            tableId: 0,
                          },
                orderList: [{
                        dish: {
                                dishId: 0,
                                name: 'Pad Kee Mao',
                                price: 5.90,
                        },
                        orderLine: {
                                amount: 1,
                                comment: 'Hello mom!',
                        },
                        extras: [{id: 1, name: 'Chicken', price: 2, selected: true}],
                }, {
                        dish: {
                                dishId: 1,
                                name: 'Red Curry',
                                price: 5.90,
                        },
                        orderLine:  {
                                amount: 1,
                                comment: 'I want it really red',
                        },
                        extras: [],
                        }],
        }, {
                bookingId: 501,
                booking: {
                            name: 'Name 2',
                            bookingDate: '27/05/2017 22:00',
                            creationDate: '12/05/2017 23:00',
                            email: 'user2@mail.com',
                            tableId: 1,
                          },
                orderList: [{
                        dish: {
                                dishId: 1,
                                name: 'Red Curry',
                                price: 5.90,
                        },
                        orderLine: {
                        amount: 1,
                        comment: 'I hope this curry worths the price',
                        },
                        extras: [{id: 2, name: 'Pork', price: 1, selected: true},
                                {id: 0, name: 'Tofu', price: 1, selected: true},
                                {id: 1, name: 'Chicken', price: 2, selected: true}],
                }, {
                        dish: {
                                dishId: 1,
                                name: 'Red Curry',
                                price: 5.90,
                        },
                        orderLine: {
                                amount: 1,
                                comment: 'hot sauce',
                        },
                        extras: [{id: 2, name: 'Pork', price: 1, selected: true}],
                }],
        }, {
                bookingId: 502,
                booking: {
                            name: 'user 3',
                            bookingDate: '29/05/2017 21:00',
                            creationDate: '29/05/2017 10:00',
                            email: 'user0@mail.com',
                            tableId: 2,
                          },
                orderList: [{
                        dish: {
                                dishId: 1,
                                name: 'Red Curry',
                                price: 5.90,
                        },
                        orderLine: {
                                amount: 1,
                                comment: 'it would be nice if the pork can be well-cooked',
                        },
                        extras: [{id: 2, name: 'Pork', price: 1, selected: true},
                                {id: 0, name: 'Tofu', price: 1, selected: true}],
                }],
        }, {
                bookingId: 503,
                booking: {
                        name: 'user 4',
                        bookingDate: '27/05/2017 20:30',
                        creationDate: '20/05/2017 17:00',
                        email: 'user4@mail.com',
                        tableId: 3,
                },
                orderList: [{
                        dish: {
                                dishId: 3,
                                name: 'Brown Curry',
                                price: 5.40,
                        },
                        orderLine: {
                                amount: 1,
                                comment: '',
                        },
                        extras: [],
                }, {
                        dish: {
                          dishId: 5,
                          name: 'Yellow Curry',
                          price: 8.20,
                        },
                        orderLine: {
                                amount: 1,
                                comment: '',
                        },
                        extras: [{id: 1, name: 'Chicken', price: 1, selected: true}],
                }, {
                        dish: {
                                dishId: 4,
                                name: 'Purple Curry',
                                price: 6.70,
                        },
                        orderLine: {
                                amount: 2,
                                comment: 'one without tomatoe',
                        },
                        extras: [],
                }, {
                        dish: {
                                dishId: 2,
                                name: 'Green Curry',
                                price: 7.90,
                        },
                        orderLine: {
                                amount: 1,
                                comment: '',
                        },
                        extras: [{id: 0, name: 'Tofu', price: 1, selected: true}],
                }],
        },
        ];
