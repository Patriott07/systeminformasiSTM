import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import {DeleteFileImage, SaveFileImage} from '../controllers/media.controller.js';
const router = express.Router();

router.post('/save', verifyToken, SaveFileImage);
router.post('/unlink', verifyToken, DeleteFileImage);

export default router;