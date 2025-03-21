import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import { verifyAdmin } from './utls/AdminOnly.js';
import {Create, Delete, Get, DeleteComment, Update, Detail, CreateComment, GiveLike} from '../controllers/blogs.controller.js';

const router = express.Router();

router.get('/get', Get);
router.get('/get/:id', Detail);
router.post('/create', verifyToken, verifyAdmin, Create);
router.post('/update/:id', verifyToken, verifyAdmin, Update);
router.delete('/delete/:id', verifyToken,verifyAdmin, Delete);


// COMMENT & LIKE
// router.get('/get/:id/get/comments', GetComment);
router.post('/get/:id/create/comment', CreateComment);
router.post('/post/:id/like', GiveLike);
router.delete('/delete/:blog_id/:id', verifyToken,verifyAdmin, DeleteComment);

export default router;