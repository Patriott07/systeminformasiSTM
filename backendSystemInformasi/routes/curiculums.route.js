import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import { verifyAdmin } from './utls/AdminOnly.js';
import {Create, Delete, Get, Update, Detail, DetailMapels} from '../controllers/curiculums.controller.js'; 
const routes = express.Router();

routes.get('/get', Get);
routes.get('/get/:id', Detail);
routes.get('/get/mapels/:id', DetailMapels);
routes.post('/create', verifyToken, verifyAdmin, Create);
routes.post('/update/:id', verifyToken, verifyAdmin, Update);
routes.delete('/delete/:id', verifyToken, verifyAdmin, Delete);

export default routes;

