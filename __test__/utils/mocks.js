const mock = {
  login: {
    email: 'email56@yahoo.com',
    password: 'pAsSwOrD',
  },
  loginBad: {
    email: 'email56@yahoo.com',
    password: '98753942442',
  },
  loginNoPassword: {
    email: 'doejane@gmail.com',
  },
  loginNoEmail: {
    password: '12345678',
  },
};

export default mock;
