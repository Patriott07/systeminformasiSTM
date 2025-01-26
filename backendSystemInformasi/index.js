import express from 'express';
import jwt from 'jsonwebtoken';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env' });
const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO, {
    // Note that mongoose will **not** pull `bufferCommands` from the query string
});

mongoose.connection.on('connected', () => console.log('connected mongo'));
mongoose.connection.on('disconnected', () => console.log('disconnected mongo'));



const checkJwt = auth({
    audience: 'mySystemInformation', // Sesuaikan dengan audiencemu
    issuerBaseURL: 'http://localhost:3000/', // URL aplikasi kamu
    secret: SECRET_KEY, // Kunci rahasia yang sama untuk memverifikasi
    tokenSigningAlg: 'HS256', // Algoritma signing (HS256, RS256, dll.)
});

// Contoh route yang butuh autentikasi
app.get('/protected', checkJwt, (req, res) => {
    res.send('This is a protected route!');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi user (contoh sederhana)
    if (username === 'admin' && password === 'password') {
        // Payload token
        const payload = {
            userId: 1,
            role: 'admin',
        };

        // Buat token JWT
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        return res.json({ token });
    }

    res.status(401).send('Invalid username or password');
});



app.listen(process.env.PORT, () => {
    console.log({ Message: `Server was running on ${process.env.PORT}` });
})