import Admin from '../db/models/admin';

const access = {};

access.allowSuperAdminOnly = async (req, res, next) => {
  const { accountId } = req;
  await Admin.findOne(accountId).then(admin => {
    if (!admin) {
      return res.json({
        success: false,
        message: 'Found no admin account that matched details provided',
      });
    }

    if (!admin.isSuperAdmin) {
      return res.json({
        success: false,
        message: 'Only super administrators are allowed to use this service',
      });
    }

    next();
  });
};

module.exports = access;
