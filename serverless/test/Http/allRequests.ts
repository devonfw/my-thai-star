import * as config from '../../src/config';
process.env.MODE = 'test';
process.env.PORT = config.TESTPORT.toString();

import { HttpEvent, Context } from '../../handlers/types';
import * as chai from 'chai';
import { isDishesView } from '../../src/model/interfaces';
import * as _ from 'lodash';
import * as business from '../../src/logic';

import { login } from '../../handlers/Http/POST/login-handler';
import { currentUser } from '../../handlers/Http/GET/current-user-handler';
import { dishSearch } from '../../handlers/Http/POST/dish-search-handler';
import { booking } from '../../handlers/Http/POST/booking-handler';
import { orderFilter } from '../../handlers/Http/POST/order-filter-handler';
import { orderSearch } from '../../handlers/Http/POST/order-search-handler';
import { bookingSearch } from '../../handlers/Http/POST/booking-search-handler';
import { invitedGuestAccept } from '../../handlers/Http/GET/invitedGuest-accept-handler';
import { invitedGuestDecline } from '../../handlers/Http/GET/invitedGuest-decline-handler';
import { bookingCancel } from '../../handlers/Http/GET/booking-cancel-handler';
import { orderCancel } from '../../handlers/Http/GET/order-cancel-handler';
import { order } from '../../handlers/Http/POST/order-handler';

const expect = chai.expect;
const should = chai.should();
let context: Context;

describe('API endpoints', function () {
    this.timeout(0);
    let auth: string;
    let user: string;
    let role: string;
    before(() => {
        business.cleanDatabase();
        // silence the console
        // console.log = () => {};
        // console.error = () => {};
    });

    describe('POST /mythaistar/login', () => {
        it('should login successfuly and return the authorization token', (done) => {
            const event: HttpEvent = <HttpEvent>_.assign({}, {
                body: {
                    username: 'waiter',
                    password: 'waiter',
                }
            });

            login(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);

                    expect(res.statusCode).to.be.equals(204);

                    expect(res.headers).to.not.be.undefined;
                    expect(res.headers.Authorization).to.not.be.undefined;

                    auth = res.headers.Authorization;

                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/security/v1/currentuser', () => {
        it('should return the data of current user', (done) => {
            // chai.request(server)
            //     .get('/mythaistar/services/rest/security/v1/currentuser')
            //     .set('Authorization', auth)
            const event = _.assign({}, {
                method: 'POST',
                path: {},
                body: {
                    user: 'hello',
                },
                headers: {
                    Authorization: auth,
                },
                query: {},
            }) as HttpEvent;

            currentUser(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);

                    expect(res.statusCode).to.be.equals(200);
                    expect(res.body.role).to.not.be.undefined;
                    expect(res.body.name).to.not.be.undefined;
                    expect(res.body.role).to.be.equal('WAITER');

                    user = res.body.name;
                    role = res.body.role;

                    done();
                } catch (err2) {
                    done(err);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/dishmanagement/v1/dish/search empty body', () => {
        it('should respond with all dishes', (done) => {
            // chai.request(server)
            //     .post('/mythaistar/services/rest/Dishmanagement/v1/dish/search')
            //     .send()
            const event = _.assign({}, {
                body: { categories: [], sortBy: [] },
            }) as HttpEvent;

            dishSearch(event, context, (err: any, res: any) => {
                try {
                    // there should be no errors
                    should.not.exist(err);

                    expect(res.result instanceof Array).to.be.true;

                    res.result.forEach((elem: any) => {
                        expect(isDishesView(elem)).to.be.true;
                    });

                    res.result.length.should.be.equal(6);
                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/dishmanagement/v1/dish/search with filter', () => {
        it('dishes must contain the word "curry"', (done) => {
            const event: HttpEvent = <HttpEvent>_.assign({}, {
                body: {
                    categories: [],
                    maxPrice: null,
                    minLikes: null,
                    searchBy: 'curry',
                    isFab: false,
                }
            });

            dishSearch(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);

                    expect(res.result instanceof Array).to.be.true;
                    res.result.forEach((elem: any) => {
                        expect(isDishesView(elem)).to.be.true;

                        expect(_.lowerCase(elem.dish.name).includes('curry') ||
                            _.lowerCase(elem.dish.description).includes('curry')).to.be.true;
                    });

                    res.result.length.should.be.equal(1);
                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    let cbookingToken: string;
    let gbookingToken: string;
    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking with a common booking', () => {
        it('should create a new booking and return the booking token', (done) => {
            const event: HttpEvent = <HttpEvent>_.assign({}, {
                body: {
                    booking: {
                        bookingDate: '2030-06-22T12:15:00.000Z',
                        name: 'Test',
                        email: 'test@test.com',
                        bookingType: 0,
                        assistants: 5,
                    },
                }
            });
            booking(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);
                    expect(res.statusCode).to.be.equals(201);

                    expect(typeof res.body === 'string').to.be.true;

                    cbookingToken = JSON.parse(res.body);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking with a guests booking', () => {
        it('should create a new booking and return the booking token', (done) => {
            const event: HttpEvent = <HttpEvent>{
                body: {
                    booking: {
                        bookingDate: '2030-06-22T12:15:00.000Z',
                        name: 'Test',
                        email: 'test2@test.com',
                        bookingType: 1,
                        assistants: 5,
                    },
                    invitedGuests: [
                        {
                            email: 'test3@test.com',
                        },
                    ],
                }
            };

            booking(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);
                    expect(res.statusCode).to.be.equals(201);
                    expect(typeof res.body === 'string').to.be.true;

                    gbookingToken = JSON.parse(res.body);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order/filter without authorization token', () => {
        it('should return a 403 error', (done) => {
            const event: HttpEvent = <HttpEvent>{
                headers: {},
            };
            orderFilter(event, context, (err: any, res?: any) => {
                try {
                    should.exist(err);

                    expect(err.message.startsWith('[403]')).to.be.true;

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order/search without authorization token', () => {
        it('should return a 403 error', (done) => {
            const event: HttpEvent = <HttpEvent>{
                headers: {},
            };
            orderSearch(event, context, (err: any, res?: any) => {
                try {
                    should.exist(err);

                    expect(err.message.startsWith('[403]')).to.be.true;

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking/search without authorization token', () => {
        it('should return a 403 error', (done) => {
            const event: HttpEvent = <HttpEvent>{
                headers: {},
            };
            bookingSearch(event, context, (err: any, res: any) => {
                should.exist(err);

                expect(err.message.startsWith('[403]')).to.be.true;

                done();
            });
        });
    });

    // describe('POST /mythaistar/services/rest/security/changepassword without authorization token', () => {
    //     it('should return a 403 error', (done) => {
    //         chai.request(server)
    //             .post('/mythaistar/services/rest/security/changepassword')
    //             .end((err, res) => {
    //                 should.exist(err);

    //                 expect(res).to.have.status(403);

    //                 done();
    //             });
    //     });
    // });

    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking/search without filter', () => {
        it('should return all bookings', (done) => {
            const event = _.assign({}, {
                method: 'POST',
                path: {},
                body: {
                    pagination: {
                        size: 8,
                        page: 1,
                        total: 1,
                    },
                },
                headers: {
                    Authorization: auth,
                },
                query: {},
            }) as HttpEvent;

            bookingSearch(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    let guestToken: string;
    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking/search with filter', () => {
        it('should return only the bookings that satisfies the filter', (done) => {
            const event = _.assign({}, {
                method: 'POST',
                path: {},
                body: {
                    pagination: {
                        size: 8,
                        page: 1,
                        total: 1,
                    },
                    bookingToken: gbookingToken,
                },
                headers: {
                    Authorization: auth,
                },
                query: {},
            }) as HttpEvent;

            bookingSearch(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);

                    guestToken = res.result[0].invitedGuests[0].guestToken;
                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/:token', () => {
        it('should return an error if an invalid token is given', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    token: 'INVALID_TOKEN'
                },
                body: {},
                query: {},
                headers: {},
            };
            invitedGuestAccept(event, context, (err: any, res: any) => {
                try {
                    should.exist(err);
                    expect(res.statusCode).to.be.equals(400);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/:token', () => {
        it('should accept an invitation', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    token: guestToken,
                },
                body: {},
                query: {},
                headers: {},
            };
            invitedGuestAccept(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);
                    expect(res.statusCode).to.be.equals(204);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/:token', () => {
        it('should return an error because this invitation is already accepted', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    token: guestToken,
                },
                body: {},
                query: {},
                headers: {},
            };

            invitedGuestAccept(event, context, (err: any, res: any) => {
                try {
                    should.exist(err);
                    expect(res.statusCode).to.be.equals(400);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/decline/:token', () => {
        it('should decline an invitation, even if it was accepted', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    token: guestToken,
                },
                body: {},
                query: {},
                headers: {},
            };
            invitedGuestDecline(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);
                    expect(res.statusCode).to.be.equals(204);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/decline/:token', () => {
        it('should return an error because this invitation is already declined', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    token: guestToken,
                },
                body: {},
                query: {},
                headers: {},
            };
            invitedGuestDecline(event, context, (err: any, res: any) => {
                try {
                    should.exist(err);
                    expect(res.statusCode).to.be.equals(400);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/booking/cancel/:token', () => {
        it('should cancel a booking with invited guests', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    token: gbookingToken,
                },
                body: {},
                query: {},
                headers: {},
            };
            bookingCancel(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);
                    expect(res.statusCode).to.be.equals(204);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/booking/cancel/:token', () => {
        it('should return an error', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    token: gbookingToken,
                },
                body: {},
                query: {},
                headers: {},
            };
            bookingCancel(event, context, (err: any, res: any) => {
                try {
                    // should.exist(err);
                    expect(res.statusCode).to.be.equals(400);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order without an order', () => {
        it('should return an error', (done) => {
            const event: HttpEvent = <HttpEvent>{
                body: JSON.stringify({}),
            };

            order(event, context, (err: any, res: any) => {
                try {
                    // should.exist(err);
                    expect(res.statusCode).to.be.equals(400);

                    done();

                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order with an invalid token', () => {
        it('should return an error', (done) => {
            const event: HttpEvent = <HttpEvent>{
                body: JSON.stringify({
                    booking: {
                        bookingToken: 'INVALID_TOKEN',
                    },
                    orderLines: [
                        {
                            orderLine: {
                                dishId: 1,
                                amount: 4,
                                comment: 'This is a comment',
                            },
                            extras: [
                                {
                                    id: 1,
                                },
                            ],
                        },
                    ],
                })
            };

            order(event, context, (err: any, res: any) => {
                try {
                    // should.exist(err);
                    expect(res.statusCode).to.be.equals(400);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    let orderId: string;
    describe('POST /mythaistar/services/rest/ordermanagement/v1/order with an order', () => {
        it('should register the order into the system and return a orderReference', (done) => {
            const event: HttpEvent = <HttpEvent>{
                body: JSON.stringify({
                    booking: {
                        bookingToken: cbookingToken,
                    },
                    orderLines: [
                        {
                            orderLine: {
                                dishId: 1,
                                amount: 4,
                                comment: 'This is a comment',
                            },
                            extras: [
                                {
                                    id: 1,
                                },
                            ],
                        },
                    ],
                })
            };

            order(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);
                    expect(res.statusCode).to.be.equals(201);

                    let resParsed = JSON.parse(res.body);
                    expect(resParsed).to.be.haveOwnPropertyDescriptor('id');
                    expect(resParsed).to.be.haveOwnPropertyDescriptor('bookingId');
                    expect(resParsed).to.be.haveOwnPropertyDescriptor('bookingToken');

                    orderId = resParsed.id.toString();

                    expect(resParsed.bookingToken).to.be.equal(cbookingToken);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order with an order', () => {
        it('should return and error because the user have an order registered', (done) => {
            const event: HttpEvent = <HttpEvent>{
                body: JSON.stringify({
                    booking: {
                        bookingToken: cbookingToken,
                    },
                    orderLines: [
                        {
                            orderLine: {
                                dishId: 1,
                                amount: 4,
                                comment: 'This is a comment',
                            },
                            extras: [
                                {
                                    id: 1,
                                },
                            ],
                        },
                    ],
                })
            };

            order(event, context, (err: any, res: any) => {
                try {
                    // should.exist(err);
                    expect(res.statusCode).to.be.equals(400);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order/search without authorization token', () => {
        it('should return a 403 error', (done) => {
            const event: HttpEvent = <HttpEvent>{
                body: {
                    paginated: { size: 20, page: 1, total: 1 },
                },
                headers: {},
            };

            orderSearch(event, context, (err: any, res: any) => {
                try {
                    should.exist(err);

                    expect(err.message.startsWith('[403]')).to.be.true;

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order/search without filter', () => {
        it('should return all orders for the future bookings', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'POST',
                path: {},
                query: {},
                body: {
                    pagination: { size: 20, page: 1, total: 1 },
                },
                headers: {
                    'Authorization': auth,
                }
            };
            orderFilter(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);

                    expect(res.result.length).to.be.equals(1);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/ordermanagement/v1/order/cancelorder/:id', () => {
        it('should cancel an order', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    id: orderId,
                },
                body: {},
                query: {},
                headers: {},
            };

            orderCancel(event, context, (err: any, res: any) => {
                try {
                    should.not.exist(err);
                    expect(res.statusCode).to.be.equals(204);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('GET /mythaistar/services/rest/ordermanagement/v1/order/cancelorder/:id', () => {
        it('should return an error because the order is already canceled', (done) => {
            const event: HttpEvent = <HttpEvent>{
                method: 'GET',
                path: {},
                pathParameters: {
                    id: orderId,
                },
                body: {},
                query: {},
                headers: {},
            };

            orderCancel(event, context, (err: any, res: any) => {
                try {
                    should.exist(err);
                    expect(res.statusCode).to.be.equals(400);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    after(() => {
        business.cleanDatabase();
        process.env.MODE = undefined;
        process.env.PORT = undefined;
    });
});