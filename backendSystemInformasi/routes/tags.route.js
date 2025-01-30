import express from 'express';
import { verifyToken } from './utls/verifyToken';
import {Create, Delete, Get, Update} from '../controllers/tags.controller.js';
const router = express.Router();

router.get('/get', verifyToken, Get);
router.post('/create', verifyToken, Create);
router.post('/update/:id', verifyToken, Update);
router.delete('/delete/:id', verifyToken, Delete);

export default router;