import { meterService } from '../services/meterService';
import awsService from '../config/awsSwitch';

/**
 * @class MeterController
 */
export default class MeterController {
  /**
   * @method on
   * @description turns on a user's meter when they provide their meter number
   * @param {*} req
   * @param {*} res
   * @returns {object} meter
   */
  static async on(req, res) {
    const {
      params: { meterNumber },
    } = req;

    let clientTokenUpdate;

    awsService.thingShadows.register('USER_METER', {}, async () => {
      const userMeterState = {
        state: {
          desired: {
            status: 'ON',
          },
        },
      };
      clientTokenUpdate = awsService.thingShadows.update(
        'USER_METER',
        userMeterState
      );

      if (clientTokenUpdate === null) {
        return res.status(400).send({
          status: false,
          error: 'update shadow failed, operation still in progress',
        });
      }

      const meter = await meterService.findOneAndUpdate(
        { meterNumber },
        { state: 'ON' }
      );

      if (!meter) {
        return res.status(404).send({
          status: false,
          error: 'Meter not found.',
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Meter successfully turned on',
        meter,
      });
    });
  }

  /**
   * @method off
   * @description turns off a user's meter when they provide their meter number
   * @param {*} req
   * @param {*} res
   * @returns {object} meter
   */
  static async off(req, res) {
    const {
      params: { meterNumber },
    } = req;

    awsService.thingShadows.end();

    const meter = await meterService.findOneAndUpdate(
      { meterNumber },
      { state: 'OFF' }
    );

    if (!meter) {
      return res.status(404).send({
        status: false,
        error: 'Meter not found.',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Meter successfully turned off',
      meter,
    });
  }
}
