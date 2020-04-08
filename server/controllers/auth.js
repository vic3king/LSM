import authHelper from '../helpers/auth';
import { verifyMeterNumber } from '../helpers/meter';
import authServices from '../services/authService';

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method register
   * @description registers a new user with their email, password and meterNumber
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user
   */
  static async register(req, res) {
    const { email, password, meterNumber } = req.body;

    const hashPassword = authHelper.hashPassword(password);

    if (!hashPassword) {
      return res.status(401).send({
        status: false,
        error: 'error, while trying to hash password',
      });
    }

    const user = await authServices.create({ email, password });

    if (!user) {
      return res.status(400).send({
        status: false,
        error: 'error while creating a user',
      });
    }

    const verifyMeter = verifyMeterNumber(meterNumber);

    if (!verifyMeter) {
      return res.status(402).send({
        status: false,
        error: 'no distributor found for this meter number',
      });
    }

    user.meters.push(meterNumber);
    user.save();

    return res.status(200).json({
      status: true,
      message: 'user created successfully',
      user,
    });
  }

  /**
   * @method login
   * @description login a user with their email and password
   * @param {*} req
   * @param {*} res
   * @returns {object} logged in user
   */
  static async login(req, res) {
    const { password } = req.body;
    const {
      user: { _id, email, password: hashedPassword },
    } = req;

    const userResult = await authServices.find({ email });

    if (!userResult) {
      return res.status(400).send({
        status: false,
        error: 'User does not exist',
      });
    }

    const verifiedPassword = authHelper.comparePassword(
      hashedPassword,
      password
    );

    if (!verifiedPassword) {
      return res.status(401).send({
        status: false,
        error: 'Bad Login',
      });
    }

    const token = authHelper.encode({ _id, email });

    return res.status(200).json({
      status: true,
      message: 'Login successful',
      token,
      userResult,
    });
  }
}
