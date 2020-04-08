/* eslint-disable func-names */
import mongoose from 'mongoose';
import adminSchema from '../schemas/adminSchema';
import authHelper from '../../helpers/auth';

adminSchema.pre('validate', async function hashIt() {
  if (this.isNew) {
    const hashedPassword = await authHelper.hashPassword(this.password);
    this.password = hashedPassword;
  }
});

// to prevent the printing of a user's password
adminSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// USER MODEL
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
