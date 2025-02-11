import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import {Create, Delete, Get, Update, Detail} from '../controllers/mapel.controller.js'; 
const routes = express.Router();

routes.get('/get', verifyToken, Get);
routes.get('/get/:id', verifyToken, Detail);
routes.post('/create', verifyToken, Create);
routes.post('/update/:id', verifyToken, Update);
routes.delete('/delete/:id', verifyToken, Delete);

export default routes;