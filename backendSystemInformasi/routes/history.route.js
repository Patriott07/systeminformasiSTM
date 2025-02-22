import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import { verifyAdmin } from './utls/AdminOnly.js';
import { GetHistories } from '../controllers/history.controller.js';

const router = express.Router();

router.get('/get', verifyToken, verifyAdmin, GetHistories)

export default router;