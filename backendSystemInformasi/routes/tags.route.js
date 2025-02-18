import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import { verifyAdmin } from './utls/AdminOnly.js';
import { Create, Delete, Get, Update, Detail } from '../controllers/tags.controller.js';
const router = express.Router();

router.get('/get', verifyToken, Get);
router.get('/get/:id', verifyToken, Detail);
router.post('/create', verifyToken, verifyAdmin, Create);
router.post('/update/:id', verifyToken, verifyAdmin, Update);
router.delete('/delete/:id', verifyToken, verifyAdmin, Delete);

export default router;