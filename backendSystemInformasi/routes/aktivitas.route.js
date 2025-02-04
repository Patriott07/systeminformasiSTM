import express from 'express';
import {Create,Detail,Delete, Get, Update} from '../controllers/aktivitas.controller.js';
import { verifyToken } from './utls/verifyToken.js';


const router = express.Router();

router.get('/get', verifyToken, Get);
router.get('/get/:id', verifyToken, Detail);
router.post('/create', verifyToken, Create);
router.post('/update/:id', verifyToken, Update);
router.delete('/delete/:id', verifyToken, Delete);

export default router;
