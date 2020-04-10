const mock = {
  login: {
    email: 'chuck@gmail.com',
    password: '12345678',
  },
  loginBad: {
    email: 'chuck@gmail.com',
    password: '98753942442',
  },
  loginNoPassword: {
    email: 'doejane@gmail.com',
  },
  loginNoEmail: {
    password: '12345678',
  },

  register: {
    email: 'chuck@gmail.com',
    meterNumber: '12345670',
    password: '12345678',
  },
  registerDupEmail: {
    email: 'chuck@gmail.com',
    meterNumber: '12345671',
    password: '12345678',
  },
  registerDupMeter: {
    email: 'pete@mail.com',
    meterNumber: '12345670',
    password: '12345678',
  },
  registerMeterNoDistro: {
    email: 'jack@mail.com',
    meterNumber: '9234567899',
    password: '12345678',
  },
};

export default mock;
