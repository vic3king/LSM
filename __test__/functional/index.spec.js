import request from 'supertest';
import app from '../../server/app';

describe('HOMEPAGE', () => {
  it('should respond with welcome message for LSM API', done => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it('should respond with welcome message LSM API V1', done => {
    request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it('should respond with invalid route error', done => {
    request(app)
      .get('/thisisaninvalidroute')
      .end((err, res) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
  });

  it('should respond with documentation route', done => {
    request(app)
      .get('/api/v1/doc')
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
});
