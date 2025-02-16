import mongoose from "mongoose";
import { Curiculums } from "../models/curiculums.model.js";
import { Jurusans } from "../models/jurusan.model.js";

export const Get = async (req, res) => {

    try {
        // butuh pagination sama fitur search mungkin
        const { p = 0, s } = req.query;
        let maxItems = 20;

        // Buat query pencarian (jika ada parameter search)
        const searchQuery = s
            ? { $or: [{ nama_jurusan: { $regex: s, $options: 'i' } }] }
            : {}; // Jika tidak ada parameter search, gunakan query kosong

        const totalItems = await Curiculums.countDocuments(searchQuery);

        // Ambil data berdasarkan query pencarian, sorting, dan pagination
        const curiculums = await Curiculums.find(searchQuery)
            .sort({ createdAt: -1 }) // Sortir berdasarkan tanggal terbaru
            .skip(p * maxItems) // Lewati data berdasarkan halaman
            .limit(maxItems); // Batasi jumlah data per halaman

        // Kirimkan hasil ke client
        res.status(200).json({
            success: true,
            data: curiculums,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });

    } catch (error) {
        console.error('Error fetching curiculums:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch curiculums',
            error: error.message,
        });
    }
}

export const Detail = async(req, res) => {
    try {
        const curiculum = await Curiculums.findById(req.params.id)
        res.json({ curiculum });
    } catch (error) {
        console.error('Error see detail curiculum', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Create = async (req, res) => {
    try {
        const jurusan = await Jurusans.findById(req.body.jurusan);
        const curiculum = await Curiculums.create({ ...req.body, jurusan : jurusan._id });

        res.json({ message: "Succesfully create curiculum", curiculum });

    } catch (error) {
        console.error('Error create curiculum', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Update = async (req, res) => {
    try {
        const { year, kelas, semester, nama_jurusan } = req.body;

        const curiculum = await Curiculums.findById(req.params.id);

        if (!curiculum) res.status(403).json({ message: "Invalid request, there no document" })

        curiculum.year = year;
        curiculum.kelas = kelas;
        curiculum.semester = semester;
        curiculum.nama_jurusan = nama_jurusan;

        await curiculum.save();

        res.json({ message: "Succesfully update curiculum", curiculum });

    } catch (error) {
        console.error('Error update curiculum', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Delete = async (req, res) => {
    try {
        const curiculum = await Curiculums.findById(req.params.id);
        await curiculum.deleteOne();

        res.json({ message: "Succesfully delete curiculum"});

    } catch (error) {
        console.error('Error while delete curiculum', { error });
        res.json(502)
            .res({ message: "Error while delete curiculum", error : error.message})
    }
}

