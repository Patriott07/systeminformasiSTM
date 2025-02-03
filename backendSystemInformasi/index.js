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


dotenv.config({ path: '.env' });
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload());

// daftarin routes
// app.get('/file/course', async (req, res) => {
//     let path = `./public/videos/`;
//     let file = req.header('file');
//     console.log(path,file);
//     // await res.download(path, file);
//     res.setHeader('Content-Disposition', `attachment; filename="${file}"`);
//     res.download(`${path}${file}`);
// });

// const SECRET_KEY = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO, {
    // Note that mongoose will **not** pull `bufferCommands` from the query string
});

mongoose.connection.on('connected', () => console.log('connected mongo'));
mongoose.connection.on('disconnected', () => console.log('disconnected mongo'));


// const checkJwt = auth({
//     audience: 'mySystemInformation', // Sesuaikan dengan audiencemu
//     issuerBaseURL: 'http://localhost:3000/', // URL aplikasi kamu
//     secret: SECRET_KEY, // Kunci rahasia yang sama untuk memverifikasi
//     tokenSigningAlg: 'HS256', // Algoritma signing (HS256, RS256, dll.)
// });

// // Contoh route yang butuh autentikasi
// app.get('/protected', checkJwt, (req, res) => {
//     res.send('This is a protected route!');
// });

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Validasi user (contoh sederhana)
//     if (username === 'admin' && password === 'password') {
//         // Payload token
//         const payload = {
//             userId: 1,
//             role: 'admin',
//         };

//         // Buat token JWT
//         const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

//         return res.json({ token });
//     }

//     res.status(401).send('Invalid username or password');
// });

app.use('/auth', authroute);
app.use('/event', eventroute);
app.use('/blog', blogroute);
app.use('/aktivitas', aktivitasroute);
app.use('/jurusan', jurusanroute);
app.use('/file', mediaroute)

app.listen(process.env.PORT, () => {
    console.log({ Message: `Server was running on ${process.env.PORT}` });
})