const { assert } = require('chai');
const request = require('supertest');

const server = require('../index.js');

describe('Server', () => {
  it('should return 200', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('should return 200 for details endpoint', (done) => {
    request(server)
      .get('/details')
      .expect(200, done);
  });

  it('should return 404 for non existent routes', (done) => {
    request(server)
      .get('/none')
      .expect(404, done);
  });
});
