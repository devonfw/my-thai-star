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
});