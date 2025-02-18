import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import {verifyAdmin} from './utls/AdminOnly.js';
import {AssignToAdmin, Delete, Detail, Get} from '../controllers/user.controller.js';
const router = express.Router();

router.get('/get', verifyToken, Get);
router.get('/get/:id', verifyToken, Detail);
router.post('/assign', verifyToken, verifyAdmin, AssignToAdmin);
router.delete('/delete/:id', verifyToken, verifyAdmin, Delete);

export default router;