import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { verifyMeterNumber } from '../helpers/meter';
import { authService } from '../services/authService';
import { distributorService } from '../services/distributorService';
import { meterService } from '../services/meterService';

const registerValidation = async (req, res, next) => {
  const { body } = req;
  const { email, meterNumber } = body;

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9]{8,30}$/),
    meterNumber: Joi.number()
      .integer()
      .required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    const { message } = error.details[0];
    const formattedMessage = joiFormatter(message);
    return res.status(400).send({
      status: false,
      error: formattedMessage,
    });
  }

  const distro = verifyMeterNumber(meterNumber);

  if (!distro) {
    return res.status(404).send({
      status: false,
      error: 'No distributor found for this meter number',
    });
  }

  const user = await authService.find({ email });

  if (user) {
    return res.status(409).send({
      status: false,
      error: 'A user with this email already exists.',
    });
  }

  const meter = await meterService.find({ meterNumber });

  if (meter) {
    return res.status(409).send({
      status: false,
      error: 'A user with this meter number already exists.',
    });
  }

  const distributor = await distributorService.find({ name: distro });

  req.distributor = distributor._id;
  return next();
};

export default registerValidation;
