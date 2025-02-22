import mongoose from "mongoose";
import { Blogs } from "../models/blogs.model.js";
import { History } from "../models/history.model.js";

export const Get = async (req, res) => {

    try {
        // butuh pagination sama fitur search mungkin
        const { p = 0, s } = req.query;
        let maxItems = 5;


        // Buat query pencarian (jika ada parameter search)
        const searchQuery = s
            ? { $or: [{ title: { $regex: s, $options: 'i' } }, { tags: { $in: s } }] }
            : {}; // Jika tidak ada parameter search, gunakan query kosong

        const totalItems = await Blogs.countDocuments(searchQuery);

        // Ambil data berdasarkan query pencarian, sorting, dan pagination
        const blogs = await Blogs.find(searchQuery)
            .sort({ createdAt: -1 }) // Sortir berdasarkan tanggal terbaru
            .skip(p * maxItems) // Lewati data berdasarkan halaman
            .limit(maxItems); // Batasi jumlah data per halaman

        // Kirimkan hasil ke client
        res.status(200).json({
            success: true,
            data: blogs,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });

    } catch (error) {
        console.error('Error fetching Blogs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Blogs',
            error: error.message,
        });
    }
}

export const Detail = async(req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id)
        res.json({ blog });
    } catch (error) {
        console.error('Error see detail blog', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Create = async (req, res) => {
    try {
        const blog = await Blogs.create({ ...req.body, created_by: req.user._id, comments: [], like: 0 });

        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
                    aktivitas : `Menambahkan data blog baru dengan judul blog : ${blog.title}`});

        res.json({ message: "Succesfully create blog", blog });

    } catch (error) {
        console.error('Error create blog', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Update = async (req, res) => {
    try {
        const { title, date, contents, photo, tags } = req.body;

        const blog = await Blogs.findById(req.params.id);

        if (!blog) res.status(403).json({ message: "Invalid request, there no document" })

        blog.title = title;
        blog.date = date;
        blog.contents = contents;
        blog.photo = photo;
        blog.tags = tags;

        await blog.save();

        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
                    aktivitas : `Memodifikasi data blog dengan id : ${req.params.id}`});

        res.json({ message: "Succesfully update blog", blog });

    } catch (error) {

        console.error('Error update blog', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })

    }
}

export const Delete = async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id);
        await blog.deleteOne();

        await History.create({created_by : req.user._id.toString(), name : req.user.name, 
                    aktivitas : `Menghapus data blog dengan id : ${req.params.id}`});

        res.json({ message: "Succesfully delete blog" });

    } catch (error) {
        console.error('Error while delete blog', { error });
        res.json(502)
            .res({ message: "Error while delete blog", error: error.message })
    }
}

