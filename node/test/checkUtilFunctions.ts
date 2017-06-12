import * as chai from 'chai';
import * as _ from 'lodash';
import * as util from '../src/utils/utilFunctions';

const expect = chai.expect;
const should = chai.should();

describe('Testing all util functions', () => {
    describe('renameProperties function', () => {
        it('should rename al object properties adding a prefix', () => {
            const x = {
                id: 1,
                user: 2,
                password: 3,
            };

            const renameWithTest = util.renameProperties('test');

            const xtest = renameWithTest(x);
            for (const o in xtest) {
                if (xtest.hasOwnProperty(o)) {
                    expect(o.startsWith('test')).to.be.true;
                }
            }
        });
    });

    describe('relationArrayOfIds function', () => {
        it('should make a relation of to objects into a new one', () => {
            const ob1 = [{
                id: 1,
                prop1: 'value1',
                prop2: 'value2',
                prop3: [1, 2],
            },
            {
                id: 2,
                prop1: 'value1',
                prop2: 'value2',
                prop3: [2],
            }];

            const ob2 = [
                {
                    id: 1,
                    result: true,
                },
                {
                    id: 2,
                    result: false,
                },
            ];

            const res = ob1.map(util.relationArrayOfIds(ob2, 'prop3', 'id'));

            expect(res[0]).to.have.ownPropertyDescriptor('prop3');
            expect(res[1]).to.have.ownPropertyDescriptor('prop3');
            expect(res[0].prop3.length).to.be.equals(2);
            expect(res[1].prop3.length).to.be.equals(1);
            expect(res[0].prop3[0]).to.have.ownPropertyDescriptor('result');
            expect(res[0].prop3[0].result).to.be.true;
        });
    });
});