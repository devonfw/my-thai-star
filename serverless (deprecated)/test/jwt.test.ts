import * as config from '../src/config';
process.env.MODE = 'test';
process.env.PORT = config.TESTPORT.toString();

import * as chai from 'chai';
import { code, decode } from '../src/utils/jwt';

const expect = chai.expect;
const should = chai.should();

describe('JWT logic', () => {
    let auth: string;
    describe('code function', () => {
        it('should return an error if an invalid user is given', (done) => {
            code('invalid', 'invalid', (s: any) => {
                try {
                    should.not.exist(s);

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });

        it('should return a token if a valid user is given', (done) => {
            code('waiter', 'waiter', (s: any) => {
                try {
                    should.exist(s);

                    auth = 'Bearer ' + s;
                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });

    describe('decode function', () => {
        it('should return an error if an invalid token is given', (done) => {
            decode('INVALID_AUTHORIZATION', (err, decoded) => {
                try {
                    should.exist(err);
                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });

        it('should return the user info if a valid token is given', (done) => {
            decode(auth, (err, decoded) => {
                try {
                    should.not.exist(err);

                    expect(decoded.role).to.be.equals('WAITER');
                    expect(decoded.userName).to.be.equals('waiter');

                    done();
                } catch (err2) {
                    done(err2);
                }
            });
        });
    });
});