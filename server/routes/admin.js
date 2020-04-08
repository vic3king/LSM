import express from 'express';
import { Register } from '../controllers/admin';
// import { access } from '../helpers/access-routes-helper';
// import config from '../../config';
// import { allowOnly } from '../helpers/super-admin-access';

const router = express.Router();

// Admin Routes
router.post('/admin/register', Register);
