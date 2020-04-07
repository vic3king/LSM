/* eslint-disable func-names */
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';
import authHelper from '../../helpers/auth';

userSchema.pre('validate', async function hashIt() {
  if (this.isNew) {
    const hashedPassword = await authHelper.hashPassword(this.password);
    this.password = hashedPassword;
  }
});

// to prevent the printing of a user's password
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// USER MODEL
const User = mongoose.model('User', userSchema);

export default User;
