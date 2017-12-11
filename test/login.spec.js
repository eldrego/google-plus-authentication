const request = require('supertest');
const { expect } = require('chai');
const server = require('../index.js');

describe('Server', () => {
  it('should return 200 if the server is running', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('should return 200 for "/details" endpoint', (done) => {
    request(server)
      .get('/details')
      .expect(200)
      .end((err) => {
        expect('statusCode', 200)
        done(err);
      });
  });

  it('should return 404 for non existent routes', (done) => {
    request(server)
      .get('/none')
      .expect(404, done);
  });
});
