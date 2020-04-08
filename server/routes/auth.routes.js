import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const authRoute = express.Router();

const { loginMiddleware, registerMiddleware } = middlewares;

const {
  authController: { login, register },
} = controllers;

authRoute.post('/register', registerMiddleware, register);

authRoute.post('/login', loginMiddleware, login);

export default authRoute;
