const { assert } = require('chai');
const request = require('supertest');

const server = require('../index.js');

describe('Server', () => {
  it('should return 200', (done) => {
    request(server)
      .get('/')
      // .expect('Content-Type', 'text/html; charset=utf-8/')
      // .expect('Content-Length', '34')
      .expect(200, done);
  });

  it('should return 404 for non existent routes', (done) => {
    request(server)
      .get('/none')
      .expect(404, done);
  });
});
