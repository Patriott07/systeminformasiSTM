import mongoose from "mongoose";
import { Tags } from "../models/tags.model.js";

export const Get = async (req, res) => {

    try {
        // butuh pagination sama fitur search mungkin
        const { p = 0, s } = req.query;
        let maxItems = 20;

        // Buat query pencarian (jika ada parameter search)
        const searchQuery = s
            ? { $or: [{ name: { $regex: s, $options: 'i' } }] }
            : {}; // Jika tidak ada parameter search, gunakan query kosong

        const totalItems = await Tags.countDocuments(searchQuery);

        // Ambil data berdasarkan query pencarian, sorting, dan pagination
        const tags = await Tags.find(searchQuery)
            .sort({ createdAt: -1 }) // Sortir berdasarkan tanggal terbaru
            .skip(p * maxItems) // Lewati data berdasarkan halaman
            .limit(maxItems); // Batasi jumlah data per halaman

        // Kirimkan hasil ke client
        res.status(200).json({
            success: true,
            data: tags,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });

    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tags',
            error: error.message,
        });
    }
}

export const Detail = async(req, res) => {
    try {
        const tag = await Tags.findById(req.params.id)
        res.json({ tag });
    } catch (error) {
        console.error('Error see detail tag', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Create = async (req, res) => {
    try {
        const tag = await Tags.create({ ...req.body });

        res.json({ message: "Succesfully create tag", tag });

    } catch (error) {
        console.error('Error create tag', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Update = async (req, res) => {
    try {
        const { name } = req.body;

        const tag = await Tags.findById(req.params.id);

        if (!tag) res.status(403).json({ message: "Invalid request, there no document" })

        tag.name = name;
        await tag.save();

        res.json({ message: "Succesfully update tag", tag });

    } catch (error) {
        console.error('Error update tag', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Delete = async (req, res) => {
    try {
        const tag = await Tags.findById(req.params.id);
        await tag.deleteOne();

        res.json({ message: "Succesfully delete tag"});

    } catch (error) {
        console.error('Error while delete tag', { error });
        res.json(502)
            .res({ message: "Error while delete tag", error : error.message})
    }
}

