import * as config from '../src/config';
process.env.MODE = 'test';
process.env.PORT = config.TESTPORT.toString();

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
        it('should take a string array property and remplace it with a object array property', () => {
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

    describe('getNanoTime function', () => {
        it('should return a number with the time in nanoseconds', () => {
            expect(typeof util.getNanoTime() === 'number').to.be.true;
        });
    });

    describe('validEmail function', () => {
        it('should check if a email is well formed or not', () => {
            expect(util.validEmail('user@gmail.com')).to.be.true;
            expect(util.validEmail('user@gmail')).to.be.false;
            expect(util.validEmail('user@gmail.online')).to.be.true;
            expect(util.validEmail('hello.com')).to.be.false;
        });
    });

    describe('setIntersection function', () => {
        it('should return the intersection of two sets', () => {
            const a = new Set<string>(['a', 'b', 'c']);
            const b = new Set<string>(['d', 'e', 'f']);
            const c = new Set<string>(['a', 'd', 'h']);

            expect(util.setIntersection(a, b).size).to.be.equals(0);
            expect(util.setIntersection(a, c).size).to.be.equals(1);
            expect([...util.setIntersection(a, c)][0]).to.be.equals('a');
        });
    });

    describe('objectToArray function', () => {
        it('should an array with all values of the object properties', () => {
            const o = {
                a: 23,
                b: 59,
                c: {
                    a: 4,
                    b: 2,
                },
            };

            const a = util.objectToArray(o);
            expect(a.length).to.be.equals(3);
            expect(a[0]).to.be.equals(23);
            expect(a[1]).to.be.equals(59);
            expect(a[2]).to.be.instanceOf(Object);
        });
    });

    describe('getPagination function', () => {
        it('should convert a array into a PaginatedList', () => {
            const l = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const pag1 = util.getPagination(5, 1, l);
            const pag2 = util.getPagination(5, 2, l);

            expect(pag1.pagination.size).to.be.equals(5);
            expect(pag1.pagination.page).to.be.equals(1);
            expect(pag2.pagination.page).to.be.equals(2);
            expect(pag1.result[0]).to.be.equals(1);
            expect(pag2.result[0]).to.be.equals(6);
        });
    });

    describe('checkType function', () => {
        it('should check if an object fulfill a type definition', () => {
            const t: util.TypeDefinition = {
                a: ['required', 'string'],
                b: ['optional', 'number'],
                c: ['optional', 'array'],
            };

            const o1 = {
                a: 5,
            };

            const o2 = {
                a: 'hello',
                b: 5,
                c: ['a', 5, { a: 3}],
            };

            const o3 = {
                b: 5,
            };

            expect(util.checkType(t, o1)).to.be.false;
            expect(util.checkType(t, o2)).to.be.true;
            expect(util.checkType(t, o3)).to.be.false;
        });
    });

    after(() => {
        process.env.MODE = undefined;
        process.env.PORT = undefined;
    });
});
