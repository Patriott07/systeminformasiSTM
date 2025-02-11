import mongoose from "mongoose";
import { Aktivitas } from "../models/aktivitas.model.js";

export const Get = async (req, res) => {

    try {
        // butuh pagination sama fitur search mungkin
        const { p = 0, s } = req.query;
        let maxItems = 20;

        // Buat query pencarian (jika ada parameter search)
        const searchQuery = s
            ? { $or: [{ title: { $regex: s, $options: 'i' } }, { description: { $regex: s, $options: 'i' } }] }
            : {}; // Jika tidak ada parameter search, gunakan query kosong

        const totalItems = await Aktivitas.countDocuments(searchQuery);

        // Ambil data berdasarkan query pencarian, sorting, dan pagination
        const aktv = await Aktivitas.find(searchQuery)
            .sort({ createdAt: -1 }) // Sortir berdasarkan tanggal terbaru
            .skip(p * maxItems) // Lewati data berdasarkan halaman
            .limit(maxItems); // Batasi jumlah data per halaman

        // Kirimkan hasil ke client
        res.status(200).json({
            success: true,
            data: aktv,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });

    } catch (error) {
        console.error('Error fetching aktivitas:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch aktivitas',
            error: error.message,
        });
    }
}


export const Detail = async(req, res) => {
    try {
        const aktivitas = await Aktivitas.findById(req.params.id)
        res.json({ aktivitas });
    } catch (error) {
        console.error('Error see detail aktivitas', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Create = async (req, res) => {
    try {
        const aktv = await Aktivitas.create({ ...req.body });

        res.json({ message: "Succesfully create aktivitas", aktivitas: aktv });

    } catch (error) {
        console.error('Error create aktivitas', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Update = async (req, res) => {
    try {
        const { title, description, details_media } = req.body;

        const aktv = await Aktivitas.findById(req.params.id);

        if (!aktv) res.status(403).json({ message: "Invalid request, there no document" })

        aktv.title = title;
        aktv.description = description;
        aktv.details_media = details_media;

        await aktv.save();

        res.json({ message: "Succesfully update aktivitas", aktv });

    } catch (error) {
        console.error('Error update aktivitas', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Delete = async (req, res) => {
    try {
        const aktv = await Aktivitas.findById(req.params.id);
        await aktv.deleteOne();

        res.json({ message: "Succesfully delete Aktivitas" });

    } catch (error) {
        console.error('Error while delete Aktivitas', { error });
        res.json(502)
            .res({ message: "Error while delete Aktivitas", error: error.message })
    }
}


