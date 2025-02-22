import mongoose from "mongoose";
import { Mapels } from "../models/mapel_curiculum.model.js";
import { Curiculums } from "../models/curiculums.model.js";
import { History } from "../models/history.model.js";

export const Get = async (req, res) => {

    try {
        // butuh pagination sama fitur search mungkin
        const { p = 0, select } = req.query;
        let maxItems = 10000;

        // Buat query pencarian (jika ada parameter search)
        const searchQuery = select
            ? {curiculum : new mongoose.Types.ObjectId(select)}
            : {}; // Jika tidak ada parameter search, gunakan query kosong

        const totalItems = await Mapels.countDocuments(searchQuery);

        // Ambil data berdasarkan query pencarian, sorting, dan pagination
        const mapels = await Mapels.find(searchQuery)
            .sort({ createdAt: -1 }) // Sortir berdasarkan tanggal terbaru
            .skip(p * maxItems) // Lewati data berdasarkan halaman
            .populate('curiculum')
            .limit(maxItems); // Batasi jumlah data per halaman

        // Kirimkan hasil ke client
        res.status(200).json({
            success: true,
            data: mapels,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });

    } catch (error) {
        console.error('Error fetching Mapels:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Mapels',
            error: error.message,
        });
    }
}

export const Detail = async(req, res) => {
    try {
        const mapel = await Mapels.findById(req.params.id)
        res.json({ mapel });
    } catch (error) {
        console.error('Error see detail mapel', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Create = async (req, res) => {
    try {
        const curiculum = await Curiculums.findById(req.body.curiculum);
        const mapel = await Mapels.create({ ...req.body, curiculum : curiculum._id });

        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
            aktivitas : `Menambahkan mapel baru dengan nama mapel : ${mapel.name}`});

        res.json({ message: "Succesfully create mapel", mapel });
    } catch (error) {
        console.error('Error create mapel', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Update = async (req, res) => {
    try {
        const { curiculum, nama_mapel, jam_per_minggu } = req.body;

        const mapel = await Mapels.findById(req.params.id);

        if (!mapel) res.status(403).json({ message: "Invalid request, there no document" })

        mapel.curiculum = curiculum;
        mapel.nama_mapel = nama_mapel;
        mapel.jam_per_minggu = jam_per_minggu;

        await mapel.save();

        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
            aktivitas : `Memodifikasi data mapel dengan id : ${req.params.id}`});

        res.json({ message: "Succesfully update mapel", mapel });

    } catch (error) {
        console.error('Error update mapel', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Delete = async (req, res) => {
    try {
        const mapel = await Mapels.findById(req.params.id);
        await mapel.deleteOne();

        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
            aktivitas : `Menghapus data mapel dengan id : ${req.params.id}`});

        res.json({ message: "Succesfully delete mapel"});

    } catch (error) {
        console.error('Error while delete mapel', { error });
        res.json(502)
            .res({ message: "Error while delete mapel", error : error.message})
    }
}

