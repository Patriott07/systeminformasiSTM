import express from 'express';
import {Create,Detail,Delete, Get, Update} from '../controllers/aktivitas.controller.js';
import { verifyToken } from './utls/verifyToken.js';
import { verifyAdmin } from './utls/AdminOnly.js';


const router = express.Router();

router.get('/get', Get);
router.get('/get/:id', Detail);
router.post('/create', verifyToken, verifyAdmin, Create);
router.post('/update/:id', verifyToken, verifyAdmin, Update);
router.delete('/delete/:id', verifyToken,verifyAdmin,  Delete);

export default router;
