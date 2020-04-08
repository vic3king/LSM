import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { verifyMeterNumber } from '../helpers/meter';
import { authService } from '../services/authService';

const registerValidation = async (req, res, next) => {
  const { body } = req;
  const { email, meterId } = body;

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string().required(),
    meterId: Joi.string().required(),
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

  const user = await authService.find({ email });

  if (user) {
    return res.status(409).send({
      status: false,
      error: 'This user already exists',
    });
  }

  const verifyMeter = verifyMeterNumber(meterId);

  if (!verifyMeter) {
    return res.status(402).send({
      status: false,
      error: 'no distributor found for this meter number',
    });
  }

  // req.user = user;
  return next();
};

export default registerValidation;
