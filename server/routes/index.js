import express from 'express';
import swaggerUi from 'swagger-ui-express';

// auth Routes
import authRoute from './auth.routes';

import indexRoute from './index.routes';
import swaggerSpec from '../../documentation/swagger.json';

// express router
const router = express.Router();

// Routes with base URl
router.use('/auth', authRoute);

router.use(indexRoute);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
