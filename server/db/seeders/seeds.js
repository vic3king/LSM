import UserModel from '../models/user';
import DistributorModel from '../models/distributor';
import MeterModel from '../models/meter';

const usersDeleteSeed = async () => {
  await UserModel.deleteMany({});
};

const metersDeleteSeed = async () => {
  await MeterModel.deleteMany({});
};

const distributorsDeleteSeed = async () => {
  await MeterModel.deleteMany({});
};

const userCreateSeed = async () => {
  await UserModel.insertMany([
    {
      _id: '5ded11a8af178a9daabca0e8',
      email: 'email56@yahoo.com',
      password: 'pAsSwOrD',
      meters: ['5dadbcb85b23f360e9382739'],
    },
    {
      _id: '5e8c07512c15acae127bb537',
      email: 'email57@yahoo.com',
      password: 'pAsSwOrD',
      meters: ['5e9030630089781398073741'],
    },
  ]);
};

const distributorCreateSeed = async () => {
  await DistributorModel.deleteMany({});

  await DistributorModel.insertMany([
    {
      _id: '5e8c07512c15acae127bb538',
      name: 'EKEDC',
      walletBalance: 0,
    },
    {
      _id: '5e82eaa49743b188c41117bb',
      name: 'BEDC',
      walletBalance: 0,
    },
  ]);
};

const meterCreateSeed = async () => {
  await MeterModel.insertMany([
    {
      _id: '5dadbcb85b23f360e9382739',
      user: '5ded11a8af178a9daabca0e8',
      clientId: 'Meter1',
      meterNumber: '12345678',
      distributor: '5e8c07512c15acae127bb538',
    },
    {
      _id: '5e9030630089781398073741',
      user: '5e8c07512c15acae127bb537',
      clientId: 'Meter2',
      meterNumber: '12345679',
      distributor: '5e82eaa49743b188c41117bb',
    },
  ]);
};
const seeds = {
  userCreateSeed,
  distributorCreateSeed,
  meterCreateSeed,
  usersDeleteSeed,
  metersDeleteSeed,
  distributorsDeleteSeed,
};

export default seeds;
