import mongoose from "mongoose";
import { History } from "../models/history.model.js";

export const GetHistories = async (req, res) => {
    try {
        const { p = 0, s, startDate, endDate } = req.query;
        console.log({startDate, endDate}, req.query)
        const maxItems = 20;

        let searchQuery = {};

        // 🔍 Tambahkan pencarian berdasarkan `name` atau `aktivitas`
        if (s) {
            searchQuery.$or = [
                { name: { $regex: s, $options: "i" } },
                { aktivitas: { $regex: s, $options: "i" } }
            ];
        }

        // 📅 Tambahkan filter berdasarkan rentang tanggal (jika ada)
        if (startDate && endDate) {
            searchQuery.createdAt = {
                $gte: new Date(startDate), // Tanggal mulai
                $lte: new Date(endDate)    // Tanggal akhir
            };
        }

        console.log({searchQuery})
        // 🔢 Hitung total data berdasarkan filter
        const totalItems = await History.countDocuments(searchQuery);

        // 📜 Ambil data dengan sorting, pagination, dan filter
        const histories = await History.find(searchQuery)
            .sort({ createdAt: -1 }) // ⏳ Urutkan berdasarkan tanggal terbaru
            .skip(p * maxItems) // ⏩ Lewati data berdasarkan halaman
            .limit(maxItems); // ⛔ Batasi jumlah data per halaman

        res.status(200).json({
            success: true,
            data: histories,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });
    } catch (error) {
        console.error("Error fetching histories:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch histories",
            error: error.message,
        });
    }
};
