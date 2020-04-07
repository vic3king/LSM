import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

const { loginMiddleware } = middlewares;

const {
  authController: { login },
} = controllers;

authRoute.post('/login', loginMiddleware, login);

export default authRoute;
