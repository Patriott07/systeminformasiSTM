import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import { verifyAdmin } from './utls/AdminOnly.js';
import {Create, Delete, Get, Update, Detail, CreateComment, GiveLike} from '../controllers/blogs.controller.js';

const router = express.Router();

router.get('/get', verifyToken, Get);
router.get('/get/:id', verifyToken, Detail);
router.post('/create', verifyToken, verifyAdmin, Create);
router.post('/update/:id', verifyToken, verifyAdmin, Update);
router.delete('/delete/:id', verifyToken,verifyAdmin, Delete);


// COMMENT & LIKE
// router.get('/get/:id/get/comments', GetComment);
router.post('/get/:id/create/comment', CreateComment);
router.post('/post/:id/like', GiveLike);

export default router;