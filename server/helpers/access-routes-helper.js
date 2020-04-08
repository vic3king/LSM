/**
 * @method allowOnly
 * @description access roles for user
 * @param {*} accessLevel
 * @param {*} callback
 * @returns {object} registered user roles
 */
const allowOnly = (accessLevel, callback) => {
  /**
   * @method checkUserRole
   * @description access roles for user
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user roles
   */
  function checkUserRole(req, res) {
    if (
      accessLevel === req.accessLevel ||
      (accessLevel.length > 1
        ? accessLevel.indexOf(req.accessLevel) >= 0
        : false)
    ) {
      callback(req, res);
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'Access denied!' });
    }
  }

  return checkUserRole;
};

export default allowOnly;

// /* eslint-disable no-return-assign */
// const hasRole = role => {
//     return (
//       hasRole[role] ||
//       (hasRole[role] = (req, res, next) => {
//         const { userType } = req.user;
//         if (userType !== role) {
//           return res.status(403).json({
//             status: false,
//             error: `${userType} users are not allowed to access this endpoint`,
//           });
//         }
//         next();
//       })
//     );
//   };

//   export default hasRole;
