import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { authService } from '../services/authService';

const registerValidation = async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string().required(),
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

  const user = await authService.create({ email, password });

  if (!user) {
    return res.status(400).send({
      status: false,
      error: 'error, while creating a user',
    });
  }

  req.user = user;
  return next();
};

export default registerValidation;
