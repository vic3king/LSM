const config = module.exports;

const userRoles = {
  admin: 'admin',
  superAdmin: 'superAdmin',
  customer: 'customer',
};

config.accessLevels = {
  customer: userRoles.customer,
  superAdmin: userRoles.superAdmin,
  admin: userRoles.admin,
};
