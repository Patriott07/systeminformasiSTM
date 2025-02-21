import mongoose from "mongoose"

const mapelSchema = mongoose.Schema({
    curiculum: {
        type : mongoose.Schema.Types.ObjectId, 
        required : true,
        ref : "Curiculums"
    },
    nama_mapel: String,
    jam_per_minggu: Number
    
},{
    timestamps : true
});

export const Mapels = mongoose.model('mapels', mapelSchema);