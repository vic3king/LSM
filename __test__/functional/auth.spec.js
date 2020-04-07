import request from 'supertest';
import app from '../../server/app';
import baseUrl from '../utils/baseUrl';
import mock from '../utils/mocks';
import authHelper from '../../server/helpers/auth';
import seeds from '../../server/db/seeders/seed';

beforeAll(() => {
  // should clear and seed db where needed
  seeds.usersDeleteSeed();
  seeds.userCreateSeed();

  authHelper.decode = jest.fn(() => {
    return {
      email: 'doejane@gmail.com',
    };
  });
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('LOGIN', () => {
  it('Should login a user', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/login`)
      .send({ ...mock.login });

    const {
      status,
      token,
      user: { email },
      message,
    } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(status).toBe(true);
    expect(token).toBeTruthy();
    expect(email).toEqual(mock.login.email);
    expect(message).toEqual('Login successful');
  });

  it('Should not login user with an email that does not exist', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/login`)
      .send({
        email: 'test@yahoo.com',
        password: '12324534',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('User does not exist');
  });

  it('Should fail if password is not provided', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/login`)
      .send({
        ...mock.loginNoPassword,
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('password is required');
  });

  it('Should fail if email is not provided', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/login`)
      .send({
        ...mock.loginNoEmail,
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('email is required');
  });

  it('Should fail if  password and email do not match', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/login`)
      .send({
        ...mock.loginBad,
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(401);
    expect(status).toBe(false);
    expect(error).toEqual('Bad Login');
  });
});
