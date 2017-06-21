process.env.MODE = 'test';
process.env.PORT = 9980;

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
                    should.not.exist(err);

                    expect(res).to.have.status(204);

                    expect(res).to.have.header('Authorization');

                    auth = res.header.authorization;

                    done();
                });
        });
    });

    describe('GET /mythaistar/services/rest/security/v1/currentuser', () => {
        it('should return the data of current user', (done) => {
            chai.request(server)
                .get('/mythaistar/services/rest/security/v1/currentuser')
                .set('Authorization', auth)
                .end((err, res: any) => {
                    should.not.exist(err);

                    expect(res).to.have.status(200);
                    expect(res.body.role).to.not.be.undefined;
                    expect(res.body.name).to.not.be.undefined;
                    expect(res.body.role).to.be.equal('WAITER');

                    user = res.body.name;
                    role = res.body.role;

                    done();
                });
        });
    });

    describe('POST /mythaistar/services/rest/dishmanagement/v1/dish/search empty body', () => {
        it('should respond with all dishes', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/Dishmanagement/v1/dish/search')
                .send({ categories: [], sortBy: [] })
                .end((err, res) => {
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
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 200 status code
                    expect(res).to.have.status(200);
                    // the response should be JSON
                    expect(res).to.be.json;

                    expect(res.body.result instanceof Array).to.be.true;
                    res.body.result.forEach((elem: any) => {
                        expect(isDishesView(elem)).to.be.true;

                        expect(_.lowerCase(elem.dish.name).includes('curry') ||
                            _.lowerCase(elem.dish.description).includes('curry')).to.be.true;
                    });

                    res.body.result.length.should.be.equal(1);
                    done();
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
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 200 status code
                    expect(res).to.have.status(201);
                    // the response should be JSON
                    expect(res).to.be.json;

                    expect(typeof res.body === 'string').to.be.true;

                    cbookingToken = res.body;

                    done();
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
                        bookingType: 0,
                        assistants: 5,
                    },
                    invitedGuest: [
                        {
                            email: 'test3@test.com',
                        },
                    ],
                })
                .end((err, res) => {
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 200 status code
                    expect(res).to.have.status(201);
                    // the response should be JSON
                    expect(res).to.be.json;

                    expect(typeof res.body === 'string').to.be.true;

                    gbookingToken = res.body;

                    done();
                });
        });
    });

    describe('POST /mythaistar/services/rest/bookingmanagement/v1/booking/search without filter', () => {
        it('should return all bookings', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/bookingmanagement/v1/search')
                .send({
                    pagination: {
                        size: 8,
                        page: 1,
                        total: 1,
                    },
                    sort: [
                        {
                            name: 'bookingToken',
                            direction: 'ASC',
                        },
                        {
                            name: 'email',
                            direction: 'DESC',
                        },
                        {
                            name: 'bookingDate',
                            direction: 'ASC',
                        }
                    ],
                })
                .end((err, res) => {
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 200 status code
                    expect(res).to.have.status(201);
                    // the response should be JSON
                    expect(res).to.be.json;

                    expect(typeof res.body === 'string').to.be.true;

                    gbookingToken = res.body;

                    done();
                });
        });
    });

    after(() => {
        process.env.MODE = undefined;
        process.env.PORT = undefined;
    });
});
