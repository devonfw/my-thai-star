import * as config from '../src/config';
process.env.MODE = 'test';
process.env.PORT = config.TESTPORT.toString();

import * as chai from 'chai';
import ChaiHttp = require('chai-http');
import { app as server } from '../src/app';
import { isDishesView } from '../src/model/interfaces';
import * as _ from 'lodash';

// configure chai-http
chai.use(ChaiHttp);

const expect = chai.expect;
const should = chai.should();

describe('API endpoints', () => {
    let auth: string;
    let user: string;
    let role: string;
    describe('POST /mythaistar/login', () => {
        it('should login successfuly and return the authorization token', (done) => {
            chai.request(server)
                .post('/mythaistar/login')
                .send(
                {
                    username: 'waiter',
                    password: 'waiter',
                })
                .end((err, res: any) => {
                    try {
                        should.not.exist(err);

                        expect(res).to.have.status(204);

                        expect(res).to.have.header('Authorization');

                        auth = res.header.authorization;

                        done();

                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/security/v1/currentuser', () => {
        it('should return the data of current user', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/security/v1/currentuser')
                .set('Authorization', auth)
                .end((err, res: any) => {
                    try {
                        should.not.exist(err);

                        expect(res).to.have.status(200);
                        expect(res.body.role).to.not.be.undefined;
                        expect(res.body.name).to.not.be.undefined;
                        expect(res.body.role).to.be.equal('WAITER');

                        user = res.body.name;
                        role = res.body.role;

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/dishmanagement/v1/dish/search empty body', () => {
        it('should respond with all dishes', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/Dishmanagement/v1/dish/search')
                .send({ categories: [], sortBy: [] })
                .end((err, res) => {
                    try {
                        // there should be no errors
                        should.not.exist(err);
                        // there should be a 200 status code
                        expect(res).to.have.status(200);
                        // the response should be JSON
                        expect(res).to.be.json;

                        expect(res.body.result instanceof Array).to.be.true;

                        res.body.result.forEach((elem: any) => {
                            expect(isDishesView(elem)).to.be.true;
                        });

                        res.body.result.length.should.be.equal(6);
                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/dishmanagement/v1/dish/search with filter', () => {
        it('dishes must contain the word "curry"', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/dishmanagement/v1/dish/search')
                .send({ // FilterView
                    categories: [],
                    maxPrice: null,
                    minLikes: null,
                    searchBy: 'curry',
                    isFab: false,
                })
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;

                        expect(res.body.result instanceof Array).to.be.true;
                        res.body.result.forEach((elem: any) => {
                            expect(isDishesView(elem)).to.be.true;

                            expect(_.lowerCase(elem.dish.name).includes('curry') ||
                                _.lowerCase(elem.dish.description).includes('curry')).to.be.true;
                        });

                        res.body.result.length.should.be.equal(1);
                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    let cbookingToken: string;
    let gbookingToken: string;
    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking with a common booking', () => {
        it('should create a new booking and return the booking token', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/bookingmanagement/v1/booking')
                .send({
                    booking: {
                        bookingDate: '2030-06-22T12:15:00.000Z',
                        name: 'Test',
                        email: 'test@test.com',
                        bookingType: 0,
                        assistants: 5,
                    },
                })
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(201);
                        expect(res).to.be.json;

                        expect(typeof res.body === 'string').to.be.true;

                        cbookingToken = res.body;

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking with a guests booking', () => {
        it('should create a new booking and return the booking token', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/bookingmanagement/v1/booking')
                .send({
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
                })
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(201);
                        expect(res).to.be.json;
                        expect(typeof res.body === 'string').to.be.true;

                        gbookingToken = res.body;

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order/filter without authorization token', () => {
        it('should return a 403 error', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/ordermanagement/v1/order/filter')
                .end((err, res) => {
                    try {
                        should.exist(err);

                        expect(res).to.have.status(403);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order/search without authorization token', () => {
        it('should return a 403 error', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/ordermanagement/v1/order/search')
                .end((err, res) => {
                    try {
                        should.exist(err);

                        expect(res).to.have.status(403);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking/search without authorization token', () => {
        it('should return a 403 error', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/bookingmanagement/v1/booking/search')
                .end((err, res) => {
                    try {
                        should.exist(err);

                        expect(res).to.have.status(403);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/security/changepassword without authorization token', () => {
        it('should return a 403 error', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/security/changepassword')
                .end((err, res) => {
                    try {
                        should.exist(err);

                        expect(res).to.have.status(403);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking/search without filter', () => {
        it('should return all bookings', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/bookingmanagement/v1/booking/search')
                .set('Authorization', auth)
                .send({
                    pagination: {
                        size: 8,
                        page: 1,
                        total: 1,
                    },
                })
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    let guestToken: string;
    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking/search with filter', () => {
        it('should return only the bookings that satisfies the filter', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/bookingmanagement/v1/booking/search')
                .set('Authorization', auth)
                .send({
                    pagination: {
                        size: 8,
                        page: 1,
                        total: 1,
                    },
                    bookingToken: gbookingToken,
                })
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;

                        guestToken = res.body.result[0].invitedGuests[0].guestToken;
                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/:token', () => {
        it('should return an error if an invitid token is given', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/INVALID_TOKEN')
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(400);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/:token', () => {
        it('should accept an invitation', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/' + guestToken)
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(204);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/:token', () => {
        it('should return an error because this invitation is already accepted', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/' + guestToken)
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(400);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/decline/:token', () => {
        it('should decline an invitation, even if it was accepted', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/bookingmanagement/v1/invitedguest/decline/' + guestToken)
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(204);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/invitedguest/decline/:token', () => {
        it('should return an error because this invitation is already declined', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/bookingmanagement/v1/invitedguest/decline/' + guestToken)
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(400);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/booking/cancel/:token', () => {
        it('should cancel a booking with invited guests', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/bookingmanagement/v1/booking/cancel/' + gbookingToken)
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(204);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/bookingmanagement/v1/booking/cancel/:token', () => {
        it('should return an error', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/bookingmanagement/v1/booking/cancel/' + gbookingToken)
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(400);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order without an order', () => {
        it('should register the order into the system and return an orderReference', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/ordermanagement/v1/order')
                .send({})
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(400);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order with an invalid token', () => {
        it('should return an error', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/ordermanagement/v1/order')
                .send({
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
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(400);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    let orderId: string;
    describe('POST /mythaistar/services/rest/ordermanagement/v1/order with an order', () => {
        it('should register the order into the system and return a orderReference', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/ordermanagement/v1/order')
                .send({
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
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(201);
                        expect(res).to.be.json;

                        expect(res.body).to.be.haveOwnPropertyDescriptor('id');
                        expect(res.body).to.be.haveOwnPropertyDescriptor('bookingId');
                        expect(res.body).to.be.haveOwnPropertyDescriptor('bookingToken');

                        orderId = res.body.id.toString();

                        expect(res.body.bookingToken).to.be.equal(cbookingToken);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order with an order', () => {
        it('should return and error because the user have an order registered', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/ordermanagement/v1/order')
                .send({
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
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(400);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order/search without authorization token', () => {
        it('should return a 403 error', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/ordermanagement/v1/order/search')
                .send({
                    paginated: { size: 20, page: 1, total: 1 },
                })
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(403);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('POST /mythaistar/services/rest/ordermanagement/v1/order/search without filter', () => {
        it('should return all orders for the future bookings', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/ordermanagement/v1/order/search')
                .set('Authorization', auth)
                .send({
                    pagination: { size: 20, page: 1, total: 1 },
                })
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/ordermanagement/v1/order/cancelorder/:id', () => {
        it('should cancel an order', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/ordermanagement/v1/order/cancelorder/' + orderId)
                .end((err, res) => {
                    try {
                        should.not.exist(err);
                        expect(res).to.have.status(204);

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    describe('GET /mythaistar/services/rest/ordermanagement/v1/order/cancelorder/:id', () => {
        it('should return an error because the order is already canceled', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/ordermanagement/v1/order/cancelorder/' + orderId)
                .end((err, res) => {
                    try {
                        should.exist(err);
                        expect(res).to.have.status(400);
                        expect(res).to.be.json;

                        done();
                    } catch (err) {
                        done(err);
                    }
                });
        });
    });

    after(() => {
        process.env.MODE = undefined;
        process.env.PORT = undefined;
    });
});