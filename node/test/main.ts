import * as chai from 'chai';
import bussiness from '../src/logic';
import * as server from '../src/app';

// configure chai-http
chai.use(require("chai-http"));

const expect = chai.expect;
const should = chai.should();

// delay to wait for the server starts
describe('getDishes', () => {
    it('Should return menus', () => {
        chai.expect(null).to.be.null;
    });
});

describe('POST /mythaistar/services/rest/Dishmanagement/v1/Dish/Search empty body', () => {
  it('should respond with all dishes', (done) => {
    chai.request('http://localhost:9080'/*server*/)
    .post('/mythaistar/services/rest/Dishmanagement/v1/Dish/Search')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      expect(res).to.have.status(200);
      // the response should be JSON
      expect(res).to.be.json;
      // // the JSON response body should have a
      // // key-value pair of {"status": "success"}
      // res.body.status.should.eql('success');
      // // the JSON response body should have a
      // // key-value pair of {"data": [2 user objects]}
      // res.body.data.length.should.eql(2);
      // // the first object in the data array should
      // // have the right keys
      // res.body.data[0].should.include.keys(
      //   'id', 'username', 'email', 'created_at',
      // );
      done();
    });
  });
});
