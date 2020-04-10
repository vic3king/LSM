import randomstring from 'randomstring';
import authHelper from '../helpers/auth';
import { authService } from '../services/authService';
import { meterService } from '../services/meterService';

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method register
   * @description registers a new user with their email, password and also creates a meter for the user using their meterNumber
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user
   */
  static async register(req, res) {
    const { body, distributor } = req;

    const user = await authService.create(body);

    const { _id, email } = user;

    // client id is supposed to be generated by aws, i'm using a random generator because we are skipping that flow for speed of development
    const clientId = randomstring.generate({
      length: 12,
      charset: 'alphabetic',
    });

    const meter = await meterService.create({
      user: user._id,
      distributor,
      clientId,
      meterNumber: body.meterNumber,
    });

    user.meters.push(meter._id);
    user.save();
    const token = authHelper.encode({ _id, email });

    return res.status(200).json({
      status: true,
      message: 'Registration successful',
      token,
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
      user,
      user: { _id, email, password: hashedPassword },
    } = req;

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
      user,
    });
  }
}
