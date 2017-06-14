import * as chai from 'chai';
import ChaiHttp = require('chai-http');
import { app as server } from '../src/app';
import { isDishesView } from '../src/model/interfaces';
import * as _ from 'lodash';

// configure chai-http
chai.use(ChaiHttp);

const expect = chai.expect;
const should = chai.should();

describe('Get dishes', () => {
    describe('POST /mythaistar/services/rest/dishmanagement/v1/dish/search empty body', () => {
        it('should respond with all dishes', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/Dishmanagement/v1/dish/search')
                .send({categories: [], sortBy: []})
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
});
