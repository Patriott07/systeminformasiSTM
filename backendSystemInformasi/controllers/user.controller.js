import mongoose from "mongoose";
import { Users } from "../models/users.model.js";

export const Get = async (req, res) => {

    try {
        // butuh pagination sama fitur search mungkin
        const { p = 0, s } = req.query;
        let maxItems = 20;

        // Buat query pencarian (jika ada parameter search)
        const searchQuery = s
            ? { $or: [{ name: { $regex: s, $options: 'i' }, email : {$regex : s, $options : 'i'} }] }
            : {}; // Jika tidak ada parameter search, gunakan query kosong

        const totalItems = await Users.countDocuments(searchQuery);

        // Ambil data berdasarkan query pencarian, sorting, dan pagination
        const users = await Users.find(searchQuery)
            .sort({ createdAt: -1 }) // Sortir berdasarkan tanggal terbaru
            .skip(p * maxItems) // Lewati data berdasarkan halaman
            .limit(maxItems); // Batasi jumlah data per halaman

        // Kirimkan hasil ke client
        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message,
        });
    }
}

export const Detail = async(req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.json({ user });
    } catch (error) {
        console.error('Error see detail user', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}


export const Delete = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        await user.deleteOne();

        res.json({ message: "Succesfully delete user"});

    } catch (error) {
        console.error('Error while delete user', { error });
        res.json(502)
            .res({ message: "Error while delete user", error : error.message})
    }
}


export const AssignToAdmin = async (req, res) => {
    try {
        const user = await Users.findById(req.body.id);
        user.role = "admin";

        await user.save();

        res.json({ message: "Succesfully assigning user to admin"});

    } catch (error) {
        console.log({message : "Error while Assign to admin", error})
        res.json(502)
            .res({ message: "Error while Assigning user become admin", error : error.message})
    }
}
