import mongoose from "mongoose";

const SchemaCuriculum = mongoose.Schema({
    year : Number,
    kelas : String,
    semester : Number, 
    nama_jurusan : String,
    jurusan : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Jurusans",
        required: true
    }
})

export const Curiculums = mongoose.model("Curiculums", SchemaCuriculum)