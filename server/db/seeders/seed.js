import UserModel from '../models/user';

const usersDeleteSeed = async () => {
  await UserModel.deleteMany({});
};

const userCreateSeed = async () => {
  await UserModel.insertMany([
    {
      email: 'email56@yahoo.com',
      password: 'pAsSwOrD',
    },
    {
      email: 'email57@yahoo.com',
      password: 'pAsSwOrD',
    },
  ]);
};
const seeds = {
  usersDeleteSeed,
  userCreateSeed,
};

export default seeds;
