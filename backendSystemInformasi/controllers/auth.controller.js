import mongoose from "mongoose";
import { Users } from "../models/users.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(403).json({ message: 'email required' })

    const user = await Users.findOne({ email });

    if (!user) return res.status(403).json({ message: 'cannt find any account' })

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return res.status(403).json({ message: 'cannt find any account' })

    let payload = {
        ...user,
        password: ''
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({ message: "berhasil login", token, role : user.role });

}
export const Register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(402).json({ message: "Please fill form correctly" });

    const hashedPassword = bcryptjs.hashSync(password || '', 10);
    await Users.create({ name, email, password: hashedPassword, role : "user" });
    res.status(201).json({ message: 'User created successfully!' });

}
export const logout = (req, res) => {
    res.json(200, { message: "berhasil logout" });
}