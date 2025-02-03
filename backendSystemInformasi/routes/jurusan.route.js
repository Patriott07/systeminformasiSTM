import express from 'express';
import { verifyToken } from './utls/verifyToken';
import {Create, CreateTeacher, Delete, DeleteTeacher, Get, GetTeachers, Update, UpdateTeacher} from '../controllers/jurusan.controller.js';
const router = express.Router();

// jurusan
router.get('/get', verifyToken, Get);
router.post('/create', verifyToken, Create);
router.post('/update/:id', verifyToken, Update);
router.delete('/delete/:id', verifyToken, Delete);


// teachers
router.get('/guru/get/:jurusan_id', verifyToken, GetTeachers);
router.post('/guru/create/:jurusan_id', verifyToken, CreateTeacher);
router.post('/guru/update/:jurusan_id', verifyToken, UpdateTeacher);
router.delete('/guru/delete/:jurusan_id/:id', verifyToken, DeleteTeacher);

export default router;