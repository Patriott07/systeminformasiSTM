import mongoose from "mongoose";

const SchemaAktivitas = mongoose.Schema({
    title: String,
    description: String,
    date : {
        type : Date,
        default : Date.now
    },
    details_media: [
        mongoose.Schema({
            type: String,
            content : String
        })
    ],
},{
    timestamps : true
});

export const Aktivitas = mongoose.model('kegiatans', SchemaAktivitas)
