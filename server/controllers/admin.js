// import passwordHash from 'password-hash';
// import adminSchema from '../db/models/admin';

// const Admin = {};

// // register admin
// Admin.Register = async (req, res) => {
//   const data = req.body;

//   if (!data.email || !data.password) {
//     return res.json({
//       success: false,
//       message: 'Please provide required fields',
//     });
//   }

//   try {
//     const hashPassword = passwordHash.generate(data.password); // encrypt admin password
//     data.password = hashPassword;
//     // console.log(data.password);
//     const result = await adminSchema.create(data);
//     if (!result) {
//       return res.json({
//         success: false,
//         message: 'error, while trying to create admin',
//       });
//     }

//     return res.json({ success: true, message: 'admin created successfully' });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: 'Error occurred',
//       error,
//     });
//   }
// };

// module.exports = Admin;
