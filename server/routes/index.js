import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../documentation/swagger.json';

// index Routes
import indexRoute from './index.routes';

// auth Routes
import authRoute from './auth.routes';

// meter Routes
import meterRoute from './meter.routes';

// express router
const router = express.Router();

// routes
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use('/auth', authRoute);
router.use(indexRoute);
router.use(meterRoute);

export default router;
