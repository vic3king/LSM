import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { meterService } from '../services/meterService';
// import awsService from '../config/awsSwitch';

const createMeterValidation = async (req, res, next) => {
  const { params } = req;
  const { meterNumber } = params;

  const schema = Joi.object({
    meterNumber: Joi.number()
      .integer()
      .required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const { message } = error.details[0];
    const formattedMessage = joiFormatter(message);
    return res.status(400).send({
      status: false,
      error: formattedMessage,
    });
  }

  const meter = await meterService.find({ meterNumber });

  if (!meter) {
    return res.status(404).send({
      status: false,
      error: 'Meter not found.',
    });
  }

  req.clientId = meter.clientId;
  return next();
};

export default createMeterValidation;
