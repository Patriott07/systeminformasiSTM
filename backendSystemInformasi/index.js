import express from "express";
import jwt from "jsonwebtoken";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";

import authroute from './routes/auth.route.js';
import eventroute from './routes/event.route.js';
import blogroute from './routes/blog.route.js';
import jurusanroute from './routes/jurusan.route.js';
import mediaroute from './routes/media.route.js';
import aktivitasroute from './routes/aktivitas.route.js';
import curiculumroute from './routes/curiculums.route.js';
import mapelroute from './routes/mapel.route.js';
import tagroute from './routes/tags.route.js';
import userroute from './routes/user.route.js';
import historyroute from './routes/history.route.js';
import cmsroute from './routes/cms.route.js';

dotenv.config({ path: ".env" });
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

mongoose.connect(process.env.MONGO, {
  // Note that mongoose will *not* pull bufferCommands from the query string
});

mongoose.connection.on("connected", () => console.log("connected mongo"));
mongoose.connection.on("disconnected", () => console.log("disconnected mongo"));

app.use('/auth', authroute);
app.use('/user', userroute);
app.use('/event', eventroute);
app.use('/blog', blogroute);
app.use('/aktivitas', aktivitasroute);
app.use('/jurusan', jurusanroute);
app.use('/file', mediaroute)
app.use('/mapel', mapelroute)
app.use('/tags', tagroute)
app.use('/curiculum', curiculumroute)
app.use('/history', historyroute)
app.use('/cms', cmsroute)

app.listen(process.env.PORT, () => {
  console.log({ Message: `Server was running on ${process.env.PORT}` });
});

// Gunakan '0.0.0.0' agar bisa diakses dari HP
// app.listen(process.env.PORT, "0.0.0.0", () => {
//   console.log(`Server berjalan di http://0.0.0.0:${process.env.PORT}`);
// });
