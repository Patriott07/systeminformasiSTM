import mongoose from "mongoose";
import { Jurusans } from "../models/jurusan.model.js";

export const Get = async (req, res) => {

    try {
        // butuh pagination sama fitur search mungkin
        const { p = 0, s } = req.query;
        let maxItems = 20;

        // Buat query pencarian (jika ada parameter search)
        const searchQuery = s
            ? { $or: [{ name: { $regex: s, $options: 'i' } }] }
            : {}; // Jika tidak ada parameter search, gunakan query kosong

        const totalItems = await Jurusans.countDocuments(searchQuery);

        // Ambil data berdasarkan query pencarian, sorting, dan pagination
        const jurusans = await Jurusans.find(searchQuery)
            .sort({ createdAt: -1 }) // Sortir berdasarkan tanggal terbaru
            .skip(p * maxItems) // Lewati data berdasarkan halaman
            .limit(maxItems); // Batasi jumlah data per halaman

        // Kirimkan hasil ke client
        res.status(200).json({
            success: true,
            data: jurusans,
            pagination: {
                currentPage: parseInt(p, 10),
                totalPages: Math.ceil(totalItems / maxItems),
                totalItems,
            },
        });

    } catch (error) {
        console.error('Error fetching jurusans:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch jurusans',
            error: error.message,
        });
    }
}

export const Detail = async (req, res) => {
    try {
        const jurusan = await Jurusans.findById(req.params.id)
        res.json({ jurusan });
    } catch (error) {
        console.error('Error see detail jurusan', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Create = async (req, res) => {
    try {
        const jurusan = await Jurusans.create({ ...req.body });

        res.json({ message: "Succesfully create jurusan ", jurusan });

    } catch (error) {
        console.error('Error create jurusan', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Update = async (req, res) => {
    try {
        const { name, deskripsi, images, teachers } = req.body;

        const jurusan = await Jurusans.findById(req.params.id);

        if (!jurusan) res.status(403).json({ message: "Invalid request, there no document" })

        jurusan.name = name;
        jurusan.deskripsi = deskripsi;

        if (req.body.hasOwnProperty('images')) {
            jurusan.images = images;
        }
        // jurusan.teachers = teachers;

        await jurusan.save();

        res.json({ message: "Succesfully update jurusan", jurusan });

    } catch (error) {
        console.error('Error update jurusan', { error })
        res.status(500)
            .json({
                message: "Something problem in server",
                error: error.message
            })
    }
}

export const Delete = async (req, res) => {
    try {
        const jurusan = await Jurusans.findById(req.params.id);
        await jurusan.deleteOne();

        res.json({ message: "Succesfully delete jurusan" });

    } catch (error) {
        console.error('Error while delete jurusan', { error });
        res.json(502)
            .res({ message: "Error while delete jurusan", error: error.message })
    }
}


// CRUD GURU

export const GetTeachers = async (req, res) => {

    const jurusan = await Jurusans.findById(req.params.jurusan_id);
    if (!jurusan) return res.status(403).json({ message: "Invalid request, there no document" })

    const guru = jurusan.teachers;

    res.status(200).json({
        success: true,
        data: guru,
        totalPages : 0,
        totalItems : guru.length
    });


}

export const CreateTeacher = async (req, res) => {
    console.log('tes')
    const jurusan = await Jurusans.findById(req.params.jurusan_id);
    const arrayOfTeacher = jurusan.teachers;

    arrayOfTeacher.push(req.body);

    jurusan.teachers = arrayOfTeacher;
    jurusan.save();

    res.json({ message: "Succesfully Create teacher", guru: req.body });

}

export const UpdateTeacher = async (req, res) => {
    const jurusan = await Jurusans.findById(req.params.jurusan_id);
    let arrayOfTeacher = jurusan.teachers;

    let body = {
        name : req.body.name,
        mengajar : req.body.mengajar,
    }

    // arrayOfTeacher = req.body.teachers;
    let resultChanges = [];
    arrayOfTeacher.map((val, _id) => {
        console.log(req.params.id === val._id.toString(), { val });
        if (req.params.id === val._id.toString()) {

            body.photo = val.photo
            console.log({test : req.body.hasOwnProperty("photo")})
            if(req.body.hasOwnProperty("photo")){
                body.photo = req.body.photo;
            }

            resultChanges.push(body);
            // return res.json({ message: "OK", val })
        } else {
            resultChanges.push(val);
        }
    })
    console.log({ resultChanges })
    jurusan.teachers = resultChanges;
    await jurusan.save();

    res.json({ message: "Succesfully Update teacher", teachers: arrayOfTeacher });
}

export const DeleteTeacher = async (req, res) => {
    const jurusan = await Jurusans.findById(req.params.jurusan_id);
    const id = req.params.id;
    const arrayOfTeacher = jurusan.teachers;

    let teachers = [];

    arrayOfTeacher.map((val, i) => {
        if (id === val._id.toString()) {

        } else {
            teachers.push(val);
        }
    });

    jurusan.teachers = teachers;
    await jurusan.save();

    res.json({ message: "Succesfully Delete teacher", teachers: teachers });
}

