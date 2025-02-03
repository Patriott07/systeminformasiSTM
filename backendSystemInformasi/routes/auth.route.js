import express from 'express';
import { verifyToken } from './utls/verifyToken.js';

import {Register, login, logout} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

export default router;