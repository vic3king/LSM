import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const meterRoute = express.Router();

const { createMeterMiddleware } = middlewares;

const {
  meterController: { on, off },
} = controllers;

meterRoute.patch('/meter/on/:meterNumber', createMeterMiddleware, on);

meterRoute.patch('/meter/off/:meterNumber', createMeterMiddleware, off);

export default meterRoute;
