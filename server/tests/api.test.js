const request = require('supertest')
const app = require('../../server')

describe('POST /user', function() {
    it('user.name should be an case-insensitive match for "john"', function(done) {
      request(app)
        .post('/user')
        .send('name=john') // x-www-form-urlencoded upload
        .expect(200, done);
    });
  });