import UserModel from '../models/user';
import DistributorModel from '../models/distributor';
import MeterModel from '../models/meter';

const deleteSeeds = async () => {
  await UserModel.deleteMany({});
  await DistributorModel.deleteMany({});
  await MeterModel.deleteMany({});
};

const userCreateSeed = async () => {
  await UserModel.insertMany([
    {
      _id: '5ded11a8af178a9daabca0e8',
      email: 'email56@yahoo.com',
      password: 'pAsSwOrD',
    },
    {
      _id: '5e8c07512c15acae127bb537',
      email: 'email57@yahoo.com',
      password: 'pAsSwOrD',
    },
  ]);
};

const distributorCreateSeed = async () => {
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
      user: '5ded11a8af178a9daabca0e8',
      distributor: '5e8c07512c15acae127bb538',
    },
    {
      user: '5e8c07512c15acae127bb537',
      distributor: '5e82eaa49743b188c41117bb',
    },
  ]);
};
const seeds = {
  deleteSeeds,
  userCreateSeed,
  distributorCreateSeed,
  meterCreateSeed,
};

export default seeds;
