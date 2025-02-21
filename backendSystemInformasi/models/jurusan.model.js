import mongoose from "mongoose"

const JurusanSchema = mongoose.Schema({
    name: String,
    deskripsi: String,
    images: [String],
    teachers:
    {
        required: false,
        type: [
            mongoose.Schema({
                name: String,
                photo: String,
                mengajar: String
            })
        ]
    }
},{
    timestamps : true
});

export const Jurusans = mongoose.model('Jurusans', JurusanSchema);