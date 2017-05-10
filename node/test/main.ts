import * as chai from 'chai';
import bussiness from '../src/logic';
import { app as server } from '../src/app';
import { IDishView, IExtraIngredientView, IImageView, IFavouriteView } from '../src/model/interfaces';
import * as _ from 'lodash';

// configure chai-http
chai.use(require('chai-http'));

const expect = chai.expect;
const should = chai.should();

describe('Get dishes', () => {
    describe('POST /mythaistar/services/rest/Dishmanagement/v1/Dish/Search empty body', () => {
        it('should respond with all dishes', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/Dishmanagement/v1/Dish/Search')
                .end((err, res) => {
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 200 status code
                    expect(res).to.have.status(200);
                    // the response should be JSON
                    expect(res).to.be.json;

                    expect(res.body instanceof Array).to.be.true;
                    res.body.forEach((elem: any) => {
                        expect(isDishView(elem)).to.be.true;
                    });

                    res.body.length.should.be.equal(10);
                    done();
                });
        });
    });

    describe('POST /mythaistar/services/rest/Dishmanagement/v1/Dish/Search with filter', () => {
        it('dishes must contain the word "curry"', (done) => {
            chai.request(server)
                .post('/mythaistar/services/rest/Dishmanagement/v1/Dish/Search')
                .send({ // FilterView
                    categories: null,
                    maxPrice: 10,
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

                    expect(res.body instanceof Array).to.be.true;
                    res.body.forEach((elem: any) => {
                        expect(isDishView(elem)).to.be.true;

                        expect(_.lowerCase(elem.name).includes('curry') ||
                               _.lowerCase(elem.description).includes('curry')).to.be.true;
                    });

                    res.body.length.should.be.equal(4);
                    done();
                });
        });
    });
});

function isImageView(elem: any): elem is IImageView {
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.content === undefined || typeof elem.content !== 'string') {
        return false;
    }
    if (elem.type === undefined || typeof elem.type !== 'string') {
        return false;
    }
    if (elem.extension === undefined || typeof elem.extension !== 'string') {
        return false;
    }

    return true;
}

function isExtraIngredientView(elem: any): elem is IExtraIngredientView {
    if (elem.id === undefined || typeof elem.id !== 'number') {
        return false;
    }
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.price === undefined || typeof elem.price !== 'number') {
        return false;
    }
    if (elem.selected === undefined || typeof elem.selected !== 'boolean') {
        return false;
    }

    return true;
}

function isFavouriteView(elem: any): elem is IFavouriteView {
    return true;
}

function isDishView(elem: any): elem is IDishView {
    if (elem.id === undefined || typeof elem.id !== 'number') {
        return false;
    }
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.description === undefined || typeof elem.description !== 'string') {
        return false;
    }
    if (elem.price === undefined || typeof elem.price !== 'number') {
        return false;
    }
    if (elem.image === undefined || !isImageView(elem.image)) {
        return false;
    }
    if (elem.extras === undefined || !(elem.extras instanceof Array)
        && !isExtraIngredientView(elem.extras)) {
        return false;
    }
    if (elem.favourite === undefined || !isFavouriteView(elem.favourite)) {
        return false;
    }

    return true;
}