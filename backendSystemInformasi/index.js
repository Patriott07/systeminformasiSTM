import express from 'express';
import jwt from 'jsonwebtoken';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';


import authroute from './routes/auth.route.js';
import eventroute from './routes/event.route.js';
import blogroute from './routes/blog.route.js';
import jurusanroute from './routes/jurusan.route.js';
import mediaroute from './routes/media.route.js';
import aktivitasroute from './routes/aktivitas.route.js';
import curiculumroute from './routes/curiculums.route.js';
import mapelroute from './routes/mapel.route.js';


dotenv.config({ path: '.env' });
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload());

mongoose.connect(process.env.MONGO, {
    // Note that mongoose will **not** pull `bufferCommands` from the query string
});

mongoose.connection.on('connected', () => console.log('connected mongo'));
mongoose.connection.on('disconnected', () => console.log('disconnected mongo'));

app.use('/auth', authroute);
app.use('/event', eventroute);
app.use('/blog', blogroute);
app.use('/aktivitas', aktivitasroute);
app.use('/jurusan', jurusanroute);
app.use('/file', mediaroute)
app.use('/mapel', mapelroute)
app.use('/curiculum', curiculumroute)

app.listen(process.env.PORT, () => {
    console.log({ Message: `Server was running on ${process.env.PORT}` });
})