import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import { verifyAdmin } from './utls/AdminOnly.js';
import { Create, CreateTeacher, Delete, DeleteTeacher, Get, Detail, GetTeachers, Update, UpdateTeacher } from '../controllers/jurusan.controller.js';
const router = express.Router();

// jurusan
router.get('/get', verifyToken, Get);
router.get('/get/:id', verifyToken, Detail);
router.post('/create', verifyToken, verifyAdmin, Create);
router.post('/update/:id', verifyToken, verifyAdmin, Update);
router.delete('/delete/:id', verifyToken, verifyAdmin, Delete);


// teachers
router.get('/guru/get/:jurusan_id', verifyToken, GetTeachers);
router.post('/guru/create/:jurusan_id', verifyToken, verifyAdmin, CreateTeacher);
router.post('/guru/update/:jurusan_id/:id', verifyToken, verifyAdmin, UpdateTeacher);
router.delete('/guru/delete/:jurusan_id/:id', verifyToken, verifyAdmin, DeleteTeacher);

export default router;