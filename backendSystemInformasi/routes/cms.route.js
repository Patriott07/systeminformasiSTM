import express from 'express';
import { verifyToken } from './utls/verifyToken.js';
import { verifyAdmin } from './utls/AdminOnly.js';
import {getCMS, saveCMS} from '../controllers/cms.controller.js'; 
const routes = express.Router();

routes.get('/get', getCMS);
routes.post('/save', verifyToken, verifyAdmin, saveCMS);

export default routes;

