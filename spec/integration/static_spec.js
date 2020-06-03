const request = require('request');
const server = require('../../src/server');

const base = 'http://localhost:3000';

describe('routes : static', () => {
  describe('GET /', () => {
    it('should return status code 200 and have "Welcome to Bloccit 2020" in the body of the response', done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain('Welcome to Bloccit 2020');
        // Note that failure to use the done() method could result in false pass due to async
        done();
      });
    });
  });
});
