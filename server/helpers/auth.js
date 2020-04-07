import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const authHelper = {
  /**
   * @method encode
   * @description
   * @param {dataObject} data to be encoded
   * @returns {token} encoded user token
   */
  encode: data => {
    const secret = process.env.SECRETKEY;
    const token = jwt.sign(data, secret, { expiresIn: '72h' });
    return token;
  },

  /**
   * @method hashPassword
   * @description hashes a users password
   * @param {passwordString} password to be hashed
   * @returns {hash} hashed password
   */
  hashPassword: password => {
    return bcrypt.hashSync(password, 10);
  },

  /**
   * @method comparePassword
   * @description compares a hashed password with a plain password
   * @param {*}  hashedPassword hashed password string
   * @param {*} password plain password string
   * @returns {token} encoded user token
   */
  comparePassword: (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
  },

  /**
   * @method decode
   * @description
   * @param {*} token to be decoded
   * @returns {token} decode user token
   */
  decode: token => {
    const isVerified = jwt.verify(token, process.env.SECRETKEY);
    return isVerified;
  },
};

export default authHelper;
