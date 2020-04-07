import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authHelper from '../../server/helpers/auth';

describe('ENCODE', () => {
  it('Should encode an object with data', async () => {
    const mockJwtSign = jest.spyOn(jwt, 'sign');
    mockJwtSign.mockResolvedValue('signedJwtToken');

    const res = authHelper.encode({ id: '1', email: 'test@mail.com' });

    expect(res).resolves.toBe('signedJwtToken');
    expect(mockJwtSign).toHaveBeenCalled();
    expect(mockJwtSign).toHaveBeenCalledTimes(1);
  });
});

describe('DECODE', () => {
  it('Should decode a token and return data', async () => {
    const mockJwtVerify = jest.spyOn(jwt, 'verify');

    mockJwtVerify.mockResolvedValue({ id: '1', email: 'test@mail.com' });

    const res = authHelper.decode({ id: '1', email: 'test@mail.com' });

    expect(res).resolves.toStrictEqual({ id: '1', email: 'test@mail.com' });
    expect(mockJwtVerify).toHaveBeenCalled();
    expect(mockJwtVerify).toHaveBeenCalledTimes(1);
  });
});

describe('HASH PASSWORD', () => {
  it('Should create a hashed password from plain text', async () => {
    const mockBcryptHashSync = jest.spyOn(bcrypt, 'hashSync');

    mockBcryptHashSync.mockResolvedValue('hashedPass');

    const res = authHelper.hashPassword('12345678');

    expect(res).resolves.toBe('hashedPass');
    expect(mockBcryptHashSync).toHaveBeenCalled();
    expect(mockBcryptHashSync).toHaveBeenCalledTimes(1);
  });
});

describe('COMPARE PASSWORD', () => {
  it('Should verify a plain password and hashed password are a match', async () => {
    const mockBcryptCompareSync = jest.spyOn(bcrypt, 'compareSync');

    mockBcryptCompareSync.mockResolvedValue(true);

    const res = authHelper.comparePassword('12345678', 'hashedPass');

    expect(res).resolves.toBe(true);
    expect(mockBcryptCompareSync).toHaveBeenCalled();
    expect(mockBcryptCompareSync).toHaveBeenCalledTimes(1);
  });

  it('Should fail to verify when plain password and hashed password are not a match', async () => {
    const mockBcryptCompareSync = jest.spyOn(bcrypt, 'compareSync');

    mockBcryptCompareSync.mockRejectedValue(false);

    try {
      await authHelper.comparePassword('12345678', 'fail');
    } catch (e) {
      expect(e).toBe(false);
      expect(mockBcryptCompareSync).toHaveBeenCalled();
      expect(mockBcryptCompareSync).toHaveBeenCalledTimes(1);
    }
  });
});
