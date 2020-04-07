import express from 'express';
import swaggerSpec from '../../documentation/swagger.json';

const indexRoute = express.Router();

indexRoute.get('/', (req, res) => {
  res.status(200).json({
    error: 'Welcome to LSM API (Version 1)',
  });
});

indexRoute.get('/doc', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default indexRoute;
