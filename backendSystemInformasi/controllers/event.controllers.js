import mongoose from "mongoose";
import { Events } from "../models/events.model.js";
import { History } from "../models/history.model.js";

export const Get = async (req, res) => {

    try {
        // butuh pagination sama fitur search mungkin
        const { p = 0, s } = req.query;
        let maxItems = 5;


        // Buat query pencarian (jika ada parameter search)
        const searchQuery = s
            ? { $or: [{ judul_event: { $regex: s, $options: 'i' } }, { deskripsi_event: { $regex: s, $options: 'i' } }, { alamat: { $regex: s, $options: 'i' } }] }
            : {}; // Jika tidak ada parameter search, gunakan query kosong

        const totalItems = await Events.countDocuments(searchQuery);

        // Ambil data berdasarkan query pencarian, sorting, dan pagination
        const events = await Events.find(searchQuery)
            .sort({ createdAt: -1 }) // Sortir berdasarkan tanggal terbaru
            .skip(p * maxItems) // Lewati data berdasarkan halaman
            .limit(maxItems); // Batasi jumlah data per halaman

        // Kirimkan hasil ke client
        res.status(200).json({
            success: true,
            data: events,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
            error: error.message,
        });
    }
}

export const Detail = async(req, res) => {
    try {
        const event = await Events.findById(req.params.id)
        res.json({ event });
    } catch (error) {
        console.error('Error see detail event', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Create = async (req, res) => {
    try {
        const event = await Events.create({ ...req.body });

        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
                    aktivitas : `Menambahkan data event baru dengan nama event : ${event.judul_event}`});
        res.json({ message: "Succesfully create event", event });

    } catch (error) {
        console.error('Error create event', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Update = async (req, res) => {
    try {
        const { judul_event, deskripsi_event, alamat, tanggal, time } = req.body;

        const event = await Events.findById(req.params.id);

        if (!event) res.status(403).json({ message: "Invalid request, there no document" })

        event.judul_event = judul_event;
        event.deskripsi_event = deskripsi_event;
        event.alamat = alamat;
        event.time = time;
        event.tanggal = tanggal;

        await event.save();
        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
                    aktivitas : `Memodifikasi data event dengan id : ${req.params.id}`});

        res.json({ message: "Succesfully update event", event });

    } catch (error) {
        console.error('Error update event', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Delete = async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);
        await event.deleteOne();

        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
                    aktivitas : `Menghapus data event dengan id : ${req.params.id}`});

        res.json({ message: "Succesfully delete event"});

    } catch (error) {
        console.error('Error while delete event', { error });
        res.json(502)
            .res({ message: "Error while delete event", error : error.message})
    }
}

